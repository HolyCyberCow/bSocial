import { Consumer, type EachMessagePayload, Kafka } from "kafkajs";
import { KafkaTopic } from "../src/utils/kafka";
import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_HOST: string = process.env.ELASTICSEARCH_HOST ||
  "localhost";
const ELASTICSEARCH_PORT: number = Number(process.env.ELASTICSEARCH_PORT) ||
  9200;
const KAFKA_HOST: string = process.env.KAFKA_HOST || "localhost";
const KAFKA_PORT: number = Number(process.env.KAFKA_PORT) || 9092;

const elasticsearchClient = new Client({
  node: `http://${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}`,
});

const kafka = new Kafka({
  clientId: "telemetry",
  brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
});

const consumer: Consumer = kafka.consumer({ groupId: "telemetry-group" });

const handleMessage = async (
  { topic, partition, message }: EachMessagePayload,
): Promise<void> => {
  console.log(
    `Recieved message from topic '${topic}': ${message.value.toString()}`,
  );

  console.log(`Forwarding topic '${topic}' message to elasticsearch...`);
  await elasticsearchClient.index({
    index: topic,
    document: JSON.parse(message.value.toString()),
  });
  console.log(`Topic '${topic}' successfully sent to elasticsearch`);

  await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
};

const runConsumer = async (): Promise<void> => {
  console.log(
    `Telemetry consumer attempting to connect to Kafaka at: ${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}`,
  );
  await consumer.connect();
  console.log(`Telemetry consumer connected, subscribing to topics...`);
  await consumer.subscribe({ topic: KafkaTopic.USER_REGISTER });
  await consumer.subscribe({ topic: KafkaTopic.POST_PUBLISH });
  await consumer.subscribe({ topic: KafkaTopic.COMMENT_PUBLISH });

  console.log(
    `Telemetry consumer subscribed to topics: ${KafkaTopic.USER_REGISTER}, ${KafkaTopic.POST_PUBLISH}, ${KafkaTopic.COMMENT_PUBLISH}`,
  );

  await consumer.run({
    eachMessage: handleMessage,
  });
};

runConsumer()
  .then(() => {
    console.log("Telemetry consumer is running and waiting for messages...");
  })
  .catch((error) => {
    console.error("Failed to run telemetry kafka consumer.", error);
  });
