#!/bin/bash
curl -X POST http://localhost:9200/user_register/_search\?pretty \
  -H "Content-Type: application/json" \
  -d @elasticsearch/registered_users_per_day/req_data.json  
