import { Consumer, type EachMessagePayload, Kafka } from "kafkajs";
import { KafkaTopic } from "../src/utils/kafka";

const KAFKA_HOST: string = process.env.KAFKA_HOST || "localhost";
const KAFKA_PORT: number = Number(process.env.KAFKA_PORT) || 9092;

const kafka = new Kafka({
  clientId: "telemetry",
  brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
});

const consumer: Consumer = kafka.consumer({ groupId: "notifications-group" });

const handleMessage = async (
  { topic, partition, message }: EachMessagePayload,
): Promise<void> => {
  console.log(
    `Recieved message`,
  );

  await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);

  // send notifications to the user about the comment creation
  // TODO
};

const runConsumer = async (): Promise<void> => {
  await consumer.connect();
  console.log(
    `Notification service consumer connected, subscribing to topics...`,
  );
  await consumer.subscribe({ topic: KafkaTopic.COMMENT_PUBLISH });

  console.log(
    `Notification service consumer subscribed to topics: ${KafkaTopic.COMMENT_PUBLISH}`,
  );

  await consumer.run({
    eachMessage: handleMessage,
  });
};

runConsumer()
  .then(() => {
    console.log(
      "Notification service consumer is running and waiting for messages...",
    );
  })
  .catch((error) => {
    console.error("Failed to run notification service kafka consumer.", error);
  });
