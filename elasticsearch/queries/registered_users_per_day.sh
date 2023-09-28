#!/bin/bash
curl -X POST\
  -H "Content-Type: application/json" \
  --data-binary @elasticsearch/queries/registered_users_per_day.json \
  http://localhost:9200/user_register/_search\?pretty
