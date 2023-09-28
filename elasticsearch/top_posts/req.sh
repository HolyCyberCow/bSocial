#!/bin/bash
curl -X POST http://localhost:9200/comment_publish/_search\?pretty \
  -H "Content-Type: application/json" \
  -d @elasticsearch/top_posts/req_data.json  
