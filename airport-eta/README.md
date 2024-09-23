# API Reference

This document provides comprehensive information about the REST API for the AirportETA project, which is built using Supabase.

## Table of Contents

1. [Authentication](#authentication)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Row Level Security (RLS)](#row-level-security-rls)
5. [Common Use Cases](#common-use-cases)
6. [GraphQL API](#graphql-api)

## Authentication

This API uses Supabase authentication. The following methods are supported:

- Email/Password
- OAuth providers:
  - GitHub
  - Google

To authenticate, use the Supabase client's `signIn` method. For example:

```javascript
const { user, error } = await supabase.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})
```

For OAuth, use:

```javascript
const { user, session, error } = await supabase.auth.signIn({
  provider: 'github'
})
```

Replace 'github' with 'google' for Google authentication.

## Database Schema

The following tables are available in the database:

1. `queue_entries`
   - `id`: UUID (Primary Key)
   - `passenger_identity_id`: UUID
   - `arrival_queue_id`: UUID
   - `eft_queue_id`: UUID
   - `status`: Text

2. `passengers`
   - `id`: UUID (Primary Key)
   - `passenger_id`: Text
   - `created_at`: Timestamp with time zone

3. `rides`
   - `id`: UUID (Primary Key)
   - `taxi_id`: Text
   - `passenger_identity_id`: Text
   - `start_location`: Text
   - `end_location`: Text
   - `start_time`: Timestamp with time zone
   - `end_time`: Timestamp with time zone
   - `status`: Text
   - `created_at`: Timestamp with time zone
   - `updated_at`: Timestamp with time zone

4. `taxi_counts`
   - `time`: Timestamp with time zone
   - `count`: Integer
   - `queue_type`: Text
   - `location`: Text

5. `passenger_counts`
   - `time`: Timestamp with time zone
   - `count`: Integer
   - `location`: Text

6. `weather_data`
   - `time`: Timestamp with time zone
   - `temperature`: Float
   - `condition`: Text
   - `humidity`: Float

7. `ml_predictions`
   - `time`: Timestamp with time zone
   - `predicted_wait_time`: Float
   - `data_window`: Integer
   - `confidence_score`: Float
   - `model_version`: Text

8. `dashboard_settings`
   - `id`: UUID (Primary Key)
   - `key`: Text
   - `enabled`: Boolean

## API Endpoints

### REST API

#### Base URL

The base URL for REST API requests is:

```
https://<PROJECT_REF>.supabase.co/rest/v1/
```

Replace `<PROJECT_REF>` with your actual Supabase project reference.

#### Endpoints

For each table, the following endpoints are available:

- GET `/<table_name>`: Retrieve all records
- GET `/<table_name>?select=<column1>,<column2>`: Retrieve specific columns
- POST `/<table_name>`: Create a new record
- PATCH `/<table_name>?<column>=eq.<value>`: Update records
- DELETE `/<table_name>?<column>=eq.<value>`: Delete records

For detailed information on using these endpoints, refer to the [Supabase REST documentation](https://supabase.com/docs/guides/api#rest-api).

### GraphQL API

Supabase provides a GraphQL API that is automatically generated from your database schema.

#### Base URL

The GraphQL endpoint for your project is:

```
https://<PROJECT_REF>.supabase.co/graphql/v1
```

Replace `<PROJECT_REF>` with your actual Supabase project reference.

#### Making Requests

To make a GraphQL request, send a POST request to the GraphQL endpoint with your query in the request body. Remember to include your project's API key in the headers.

Example using curl:

```bash
curl -X POST https://<PROJECT_REF>.supabase.co/graphql/v1 \
    -H 'apikey: <API_KEY>' \
    -H 'Content-Type: application/json' \
    --data-raw '{"query": "{ queueEntriesCollection(first: 1) { edges { node { id } } } }", "variables": {}}'
```

#### Schema

The GraphQL schema mirrors your database schema. Each table in your database becomes a type in the GraphQL schema. For example, the `queue_entries` table would be represented as:

```graphql
type QueueEntries {
  id: UUID!
  passenger_identity_id: UUID
  arrival_queue_id: UUID
  eft_queue_id: UUID
  status: String
}
```

#### Queries

You can query your data using GraphQL queries. For example, to fetch all queue entries:

```graphql
query {
  queueEntriesCollection {
    edges {
      node {
        id
        passenger_identity_id
        status
      }
    }
  }
}
```

#### Mutations

You can also create, update, and delete data using GraphQL mutations. For example, to create a new passenger:

```graphql
mutation {
  insertIntoPassengersCollection(objects: [{
    passenger_id: "12345"
  }]) {
    records {
      id
      passenger_id
    }
  }
}
```

For more detailed information on using the GraphQL API, refer to the [Supabase GraphQL documentation](https://supabase.com/docs/guides/api#graphql-api).

There is also a GraphQL playground.

## Row Level Security (RLS)

Row Level Security (RLS) policies have been implemented for the tables in this project. These policies control access to rows in database tables based on the user making the request. Ensure that your API requests are authenticated and authorized according to these policies.

## Common Use Cases

The API is commonly used for dashboard CRUD (Create, Read, Update, Delete) operations. Here are some example API calls:

1. Retrieve all queue entries:
   ```
   GET /queue_entries
   ```

2. Create a new passenger:
   ```
   POST /passengers
   {
     "passenger_id": "12345",
   }
   ```

3. Update a ride status:
   ```
   PATCH /rides?id=eq.<ride_id>
   {
     "status": "completed"
   }
   ```

4. Delete a dashboard setting:
   ```
   DELETE /dashboard_settings?key=eq.<setting_key>
   ```

---

For more information on using the Supabase REST API and GraphQL API, please refer to the [official Supabase documentation](https://supabase.com/docs/guides/api).

