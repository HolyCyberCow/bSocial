import { Kafka, Message as KafkaMessage } from "kafkajs";
import config from "../config/config";

export enum KafkaTopic {
  USER_REGISTER = "user_register",
  POST_PUBLISH = "post_publish",
  COMMENT_PUBLISH = "comment_publish",
}

const kafka = new Kafka({
  clientId: "bsocial-api",
  brokers: [`${config.kafka.host}:${config.kafka.port}`],
});

export const producer = kafka.producer();

export const produce = async (topic: KafkaTopic, messages: KafkaMessage[]) => {
  await producer.connect();
  await producer.send({
    topic,
    messages,
  });
  await producer.disconnect();
};
