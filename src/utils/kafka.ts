import { Kafka } from "kafkajs";
import config from "../config/config";

type KafkaTopic = "user_register" | "post_publish" | "comment_publish";

const kafka = new Kafka({
  clientId: "bsocial-api",
  brokers: ["kafka:9092", "kafka:9093"],
});

const producer = kafka.producer();

export default async (topic: KafkaTopic, messages: ): Promise<void> => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [],
  });
};
