CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(255) DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
