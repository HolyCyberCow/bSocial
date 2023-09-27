import { Consumer, type EachMessagePayload, Kafka } from "kafkajs";
import { KafkaTopic } from "./utils/kafka";

const kafka = new Kafka({
  clientId: "telemetry",
  brokers: [`localhost:9092`],
});

const consumer: Consumer = kafka.consumer({ groupId: "telemetry-group" });

const handleMessage = async (
  { topic, partition, message }: EachMessagePayload,
): Promise<void> => {
  console.log(
    `Recieved message from topic '${topic}': ${message.value.toString()}`,
  );

  // send data to elasticsearch here

  await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
};

const runConsumer = async (): Promise<void> => {
  await consumer.connect();
  await consumer.subscribe({ topic: KafkaTopic.USER_REGISTER });
  await consumer.subscribe({ topic: KafkaTopic.POST_PUBLISH });
  await consumer.subscribe({ topic: KafkaTopic.COMMENT_PUBLISH });

  console.log(
    `Telemetry service consumer subscribed to topics: ${KafkaTopic.USER_REGISTER}, ${KafkaTopic.POST_PUBLISH}, ${KafkaTopic.COMMENT_PUBLISH}`,
  );

  await consumer.run({
    eachMessage: handleMessage,
  });
};

runConsumer()
  .then(() => {
    console.log("Telemetry consumer is running...");
  })
  .catch((error) => {
    console.error("Failed to run telemetry kafka consumer.", error);
  });
