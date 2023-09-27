// App related
export const DEFAULT_APP_PORT: number = 8080;
export const DEFAULT_NODE_ENV: string = "dev";
export const DEFAULT_APP_ACCESS_TOKEN_EXPIRES_IN_MINUTES: number = 60;
export const DEFAULT_APP_REFRESH_TOKEN_EXPIRES_IN_MINUTES: number = 60;
export const DEFAULT_CORS_ORIGIN: string = "http://localhost:8080";
export const DEFAULT_APP_JWT_ACCESS_TOKEN_PRIVATE_KEY: string =
  "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBZzAzNHBlUG1UQ0plaWdEQU4yYXVRWWw4dzhHNXVUSXB2MEZaTkowZXhnTldNZ3BZClBKVVRDOXl4Um10ZlZxcnJUR1h1Z0FxeGhPblFPRFNnUkphN2ZpRmhsVGVyMy9qdGhuN2hIMWVhd2c2Qy9JVEIKODFlMElONU9MTnZHL2w5RHBOeng2WWlSR3BKSlpTZ2JLSHRJK0xZY29LVTZrbXloNVZPUWYrZk9VQlZ1d0ViMQpuNWVmS0NnRUJSd2l1N0o5TkVXVTVPQ296bkM3UUpmVjNKL2VaRXV3NjhDbUF1dHI3YnNsa0o4TW0xa1lvN1piCnUvZFJqTUpvczNOZ3FYc2NUM0dTVm5ITHBMQlhlbFFHY3c3bndpNmRJV1BiZ21wS3BGSGtGZVJUN2FpZGtNdFkKSlBZeVR5cmxvaG8ya2RmS2NJd21TTWlCM3psaEN1ZUZXMVE4MndJREFRQUJBb0lCQUMwb3gvZm1KZkxSYjBwdgpiNnllT0JoNlBOcm02Z1Z6NXovTUxlNFdpOXIya3RLckZDWGg3NmNJeEQrLzlnNU13cGlJQmpzcmNscVFQL2pVCndMcFdUUzNZTlVPbzNnZ3VDU05VeUFDTGxNSmhVMU9lSlVhWVIyOTJoZFNQMGlUeWhzVlE2REsxc1pJOTlkaEEKcnZhQlVGdVo1c2FwalRlRy9UZHVRaWg3aFUydFV6S0todHVIT0w0M1NKNjUxTDRLU3N3dHVIOUxoanRLV1pyMAp0WVBnVUVnNXBFWm5yUXdUbHgxT0gxbDFhWk81T29DL1pYT1dqbXVEZmdKd1pVWHJ0TWxpU2FpekVhd24xYUMrCmJWSkFucytCelZmZTFuZDFGeExBZjByNkRDam9KMzRLcWpURklLTVRJdmwzcFZab3N2OWNiRWltTHRrVjh2RmkKYmJPWDFJRUNnWUVBdmtRczJORGxjNkorUis1cHBPUTJxRjkzTFQ5MzVSdkdKek1WZngxcUhYb1lFTkNScDk1YgpDVnA3eStRanF6MXRYK01HZWhPYmN6NFpNeG9ZYkdtWWFXaktMVE9iRVdzUlluSFlseVE4c3pIVmRzV3hyTkovCjEzbjdVb0xhcTRtTE9IclRmOVBLTWxlUGdrN2dWTlR2TEYzZGdPd1VidzljR2JFY3B0WjY3SEVDZ1lFQXNLc0QKRUQ3TFlYb2ZtQ0ZrRmJlQy8vWklWUTIza1pvSlZmcm0zdkRBODBwOS9Uemt1R2o1a01TR2ZKMU1zRnQ3S2xuKwpMYXlWYzRXL0MwZ05sdWpJMFhhV2RkMnZmbjQwSVZJM0NlWlBMQkVpNVhiendkcjlJMi9aK2JUcDNjaWFhaVlwCml3QkVtMjEwdEJmbzVKOUQwMXl4NENNR041NXRWb2cwNmYxblZBc0NnWUVBa28vTGgveHFNMGZoUktHSEtXaE8KSGliams2eEhPK25JR3R3RDNCWVpicmxsSGxhN1RIZEE0eFNiTmZUMzhPbHhmaUpRRSt0VW5GSWljVFhSeUhrUwoyV2ZLRFVXcVZxR0dFN0lrcUZCV25hWnVpMzQvbmlQTUxIeWZOdkRyWnFXZDQ1VGhwSjdOS3pnOXFKLy90L2tLCmY3K1NaOFB5L1pYMFdTb1FLd2dlU2xFQ2dZQnk5MWFQQTg0bUtPcldmU1E4WGFlS0dpTUg5bDAzQ3g1NExVYUEKWGZ1eVZ3K1Y5RUtESHcwSkFGcmtUUmpTeXpWalloemViQ2oxZkZ2T1k1MDBUMWdmdHlSQ24zak13Q1A4YXh3VgovU0lZY3k1YVZRWmJhTDdDaU04NGlGcUlVVHJyU05wUDhtU3pJSStKZ3VXem9WRHFBckJlUTJ5UVZUQ2gxeEZZCkUrZGg4UUtCZ1FDMG9BWERicUFPYlBVd01zYTdDdnZyOFZCRFNHcThsemVZdTN4NXVyTUZGdE0xT3R6UlByNGEKTTJEQ01kS0w3aTREeThMdlZRdWxWcXE0T1p2QmJjNWd2MitYNWpnODh3T3FDajFXOWlBVFp6dGMydUU2enh1cgpyS2Q4enpUS2cyZk5GQ3ZEUWNvc3lkZlIydUxmR2QvZTJCMXdYTVNGVEdRckM1OUhkdktBa3c9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==";
export const DEFAULT_APP_JWT_ACCESS_TOKEN_PUBLIC_KEY: string =
  "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFnMDM0cGVQbVRDSmVpZ0RBTjJhdQpRWWw4dzhHNXVUSXB2MEZaTkowZXhnTldNZ3BZUEpVVEM5eXhSbXRmVnFyclRHWHVnQXF4aE9uUU9EU2dSSmE3CmZpRmhsVGVyMy9qdGhuN2hIMWVhd2c2Qy9JVEI4MWUwSU41T0xOdkcvbDlEcE56eDZZaVJHcEpKWlNnYktIdEkKK0xZY29LVTZrbXloNVZPUWYrZk9VQlZ1d0ViMW41ZWZLQ2dFQlJ3aXU3SjlORVdVNU9Db3puQzdRSmZWM0ovZQpaRXV3NjhDbUF1dHI3YnNsa0o4TW0xa1lvN1pidS9kUmpNSm9zM05ncVhzY1QzR1NWbkhMcExCWGVsUUdjdzduCndpNmRJV1BiZ21wS3BGSGtGZVJUN2FpZGtNdFlKUFl5VHlybG9obzJrZGZLY0l3bVNNaUIzemxoQ3VlRlcxUTgKMndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t";
export const DEFAULT_APP_JTW_REFRESH_TOKEN_PRIVATE_KEY: string =
  "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBaEM2WUVBdHJub1k1UTBWQTZWY0thV3hmcHBhakFrMWl4WS9ueTNjeDAvK3JzOXRrCmpHVEdPQkVUdzkyRzArbmVaMFFySXZOeHYwZzI3TXZ2eS94bGtJMVpZNmJNUmJHd2pPSUdjeU0xZHJCUDMrWHYKY1JsSjJ6aFhtWkdnTDkzb1M5WFJlZDlrZTFVZGl3TENaVjVEdnFuVk5UWVAzdUkxQWk5MXhrWG5FZnZnRmQ2bQpqL1l6VGo5MkNNREpONEZpNXV5V0MvWnRzL085RFByUG5MWVpFeStVWExTK0pidzZkVTBuNjRpN0kwc1dSeDBnCm8xOUcyVzVtUkRPMHEzQkhzdGszb0dpSkhIbTNUUGRYS0FhTUJ6ZmV4WU5ESTJWTGFmeFZJeW5HU2lEeGc2c0kKTFJkUHFJRlJrS3Zxa2ZLMHB2MVdTU1FYenVVdnM0N01zY3dOTHdJREFRQUJBb0lCQUh6dmJWcjg4R09OaW1KQwordStTRFkxSG1jRGpjSCtrbFU4V2pZaUt5TllRT2tKdGc4UVBIQ3V5T0hSUTFqZEdQYWh0ampnaTBjaHlnVGVnCktxOHJpUFB3SmlWQ2FxRVZLa0ovQUltakpjMWhLSjMvdnltdk5WZTNFVlZkaDRLMncvR3B6Nnpac1NmQmM0TUkKd0tUL1RCalNmV3NtQmlvc3ROMno3aVhSdkc0SnV0ck1KK2NUT25Zdkk4VFhKV0cvK2VRVW5KalNORmtQbnQ5dgp5cnNJQnF3eDF3cTkyT2R5a1UxT0lYajlITE9lNVM0dUkyT0t2ZlZHaWFUbW1IekJVcmRNSTEybjVVNGV0R3ZjClBHZjVRblJ3RUE1MnFjRXJMSURZNXZ3TE55Nlg0ejlrNk9hTjBBUSthVjBLREpOTW9JaEgzZWlQYnlzVnFrUTcKbmlUQlRnRUNnWUVBMnhiMlZqZU1KZXpRbitiS1hDajJHYXRaMWNyS3BpaEg5dHFZNzVIMUROVktCRHFrSmxrOApTNEY2T2R6SjhjenRhbFp6c0l5WWxTQWRXamwxYXo4c1FnYXB5bnZCbzM2b0RraUdNb2VUTWtRa1kwNjl3ZnZmCnQxRFhwT2Q1Z0g2MUkwRGFYWUtlRGQ2RDhtZlR4bk9BUjI4bVFkZUtsNkNkdXcrdGx1QjgrdzhDZ1lFQW1uTnMKSjRpS0xxc1d0OFBqaWRFeEU5cUt4N3k2cHhDcDIxeEhEWVlZOC9UdEw5N0wxM3pXdCtlUGJBK2NXR1RsKzhPZQpGMDlyVmwrSXkxTS9YME5jUWtYYzIvWEJvY2Y5VzV1N1JHcEZlOEpuaW1vRHl1cXF5SE8yRURFcWJJQzgxVmJaCm9CSmNNNGZmT3B5VXA1VzY2b0RXOUlFRWZhaGJpUWdaaWNzNlMrRUNnWUVBbCtpdSt3N2UxUGtEbXF1S2lpWTQKcFluQzYxTUYrZm1hRkZaemprRVV1VVkyWVFKTUNPNzh1Sm5aSnIrcElraG1JY0k1eXlOaE5KMGszUWRVRy8yYwpjVmR2YVI4d0gyM1Zscm5BbXM2WVNGVXBLZFpTQ212YkxaOFhOcGJ0RHlSTDhscW9UZ2dnRVJ2RlAxR3diRHh2CnFKZ3YzWjFXMGxXaXFDNXh2VmlBTUE4Q2dZQVlxYSt1akdZTVY3T1Qrb3E5K2hLTktndVpJM0RtdG9sNUJyNHQKMGFqd1k3N3dNdkozNFc1a0JXem9nNEdpdDlIbHB2SDZwT3J0NnVsc0ZrbjdTMFZUSzlhOXBQdWJldFRoS1BmNQpUOEx5cFRObGJkSlhONnUzd0lwbEFZVFZ1S1R1cUNTdUkrQm5OaDRXUE9TYjhoUGIyR0Q2d0JOWWdXYkVkZSttCkNqYXY0UUtCZ0ZYRDJ4UEJKaUg5eVJBc0ZXN3ZKUGZaYUhFTTEvRXk0KzZFQTVQdkVJd0cvNEpxM2haTzRjR2kKZ2dFL00vQ0FnTE9jOHMrZHhOS2RDTU1Pb2lra3RIUjBrMXpwWldzQXlNOUpjTEx3NE1sMEsrdngrVEt5VUhxNgorbld6eDg2akxuUjY3cXdjdWZMZEV3azBPRjEvS04yWmpyRUkvVC81T1A2TFViQndwTU04Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t";
export const DEFAULT_APP_JWT_REFRESH_TOKEN_PUBLIC_KEY: string =
  "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFoQzZZRUF0cm5vWTVRMFZBNlZjSwphV3hmcHBhakFrMWl4WS9ueTNjeDAvK3JzOXRrakdUR09CRVR3OTJHMCtuZVowUXJJdk54djBnMjdNdnZ5L3hsCmtJMVpZNmJNUmJHd2pPSUdjeU0xZHJCUDMrWHZjUmxKMnpoWG1aR2dMOTNvUzlYUmVkOWtlMVVkaXdMQ1pWNUQKdnFuVk5UWVAzdUkxQWk5MXhrWG5FZnZnRmQ2bWovWXpUajkyQ01ESk40Rmk1dXlXQy9adHMvTzlEUHJQbkxZWgpFeStVWExTK0pidzZkVTBuNjRpN0kwc1dSeDBnbzE5RzJXNW1SRE8wcTNCSHN0azNvR2lKSEhtM1RQZFhLQWFNCkJ6ZmV4WU5ESTJWTGFmeFZJeW5HU2lEeGc2c0lMUmRQcUlGUmtLdnFrZkswcHYxV1NTUVh6dVV2czQ3TXNjd04KTHdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t";

// Postgres
export const DEFAULT_POSTGRES_DB: string = "postgres";
export const DEFAULT_POSTGRES_USER: string = "postgres";
export const DEFAULT_POSTGRES_PASSWORD: string = "secretpass";
export const DEFAULT_POSTGRES_HOST: string = "localhost";
export const DEFAULT_POSTGRES_PORT: number = 5432;

// Kafka
export const DEFAULT_KAFKA_PORT: number = 9092;
export const DEFAULT_KAFKA_HOST: string = "localhost";
