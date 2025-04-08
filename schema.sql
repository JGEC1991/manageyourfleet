-- Enable the uuid-ossp extension
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Function to generate a timestamp
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Organizations table
    CREATE TABLE organizations (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- User Profiles table
    CREATE TABLE user_profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID UNIQUE NOT NULL, -- Link to auth.users
      organization_id UUID NOT NULL REFERENCES organizations(id),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255),
      role VARCHAR(255) DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Vehicles table
    CREATE TABLE vehicles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      vin VARCHAR(255) UNIQUE,
      license_plate_number VARCHAR(255),
      license_expiration_date DATE,
      insurance_expiration_date DATE,
      make VARCHAR(255),
      model VARCHAR(255),
      year_of_manufacture INTEGER,
      color VARCHAR(255),
      fuel_type VARCHAR(255),
      fuel_capacity DECIMAL,
      fuel_economy DECIMAL,
      odometer_reading DECIMAL,
      engine_size_and_type VARCHAR(255),
      transmission_type VARCHAR(255),
      purchase_date DATE,
      purchase_price DECIMAL,
      ownership_status VARCHAR(255),
      operating_status VARCHAR(255),
      assigned_driver UUID REFERENCES drivers(id),
      maintenance_schedule DATE,
      last_maintenance_date DATE,
      next_maintenance_due DATE,
      warranty_expiration_date DATE,
      insurance_policy_number VARCHAR(255),
      insurance_provider VARCHAR(255),
      tire_specifications VARCHAR(255),
      cargo_capacity DECIMAL,
      gps_tracking_enabled BOOLEAN,
      telematics_device_id VARCHAR(255),
      depreciation_value DECIMAL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Drivers table
    CREATE TABLE drivers (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      full_name VARCHAR(255),
      date_of_birth DATE,
      contact_number VARCHAR(20),
      email_address VARCHAR(255),
      residential_address TEXT,
      license_number VARCHAR(255),
      license_expiration_date DATE,
      license_class VARCHAR(255),
      endorsements TEXT,
      employment_start_date DATE,
      employment_end_date DATE,
      emergency_contact_name VARCHAR(255),
      emergency_contact_number VARCHAR(20),
      medical_certifications TEXT,
      certification_expiration_date DATE,
      training_completed TEXT,
      assigned_vehicle_id UUID REFERENCES vehicles(id),
      performance_score DECIMAL,
      accident_history TEXT,
      violation_history TEXT,
      availability_status VARCHAR(255),
      shift_preferences VARCHAR(255),
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON drivers
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Loads table
    CREATE TABLE loads (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      vehicle_id UUID REFERENCES vehicles(id),
      driver_id UUID REFERENCES drivers(id),
      load_reference_number VARCHAR(255),
      origin_address TEXT,
      origin_contact_information TEXT,
      destination_address TEXT,
      destination_contact_information TEXT,
      pickup_date_time TIMESTAMPTZ,
      delivery_date_time TIMESTAMPTZ,
      equipment_type_required VARCHAR(255),
      commodity_description TEXT,
      load_status VARCHAR(255),
      assigned_driver TEXT,
      carrier_information TEXT,
      rate_freight_charge DECIMAL,
      fuel_surcharge DECIMAL,
      accessorial_charges DECIMAL,
      total_payment_due DECIMAL,
      payment_status VARCHAR(255),
      special_instructions TEXT,
      document_links TEXT,
      mileage DECIMAL,
      load_board_posting_status VARCHAR(255),
      broker_shipper_details TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON loads
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Activities table
    CREATE TABLE activities (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      user_id UUID NOT NULL, -- References user_profiles(user_id)
      related_entity_type VARCHAR(255),
      related_entity_id UUID,
      activity_type VARCHAR(255),
      description TEXT,
      timestamp TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON activities
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Maintenance and Repairs table
    CREATE TABLE maintenance_repairs (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      vehicle_id UUID NOT NULL REFERENCES vehicles(id),
      service_date DATE,
      description TEXT,
      cost DECIMAL,
      service_provider VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Trigger to update updated_at timestamp
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON maintenance_repairs
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

    -- Organization Members table (Linking users to organizations)
    CREATE TABLE organization_members (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      organization_id UUID NOT NULL REFERENCES organizations(id),
      user_id UUID NOT NULL, -- Link to auth.users
      created_at TIMESTAMPTZ DEFAULT NOW(),
      CONSTRAINT unique_org_user UNIQUE (organization_id, user_id)
    );

    -- Function to get the organization ID for a user
    CREATE OR REPLACE FUNCTION get_my_organization_id()
    RETURNS UUID AS $$
    SELECT organization_id
    FROM user_profiles
    WHERE user_id = auth.uid();
    $$ LANGUAGE SQL SECURITY DEFINER;

    -- Function to check if a user is an admin in their organization
    CREATE OR REPLACE FUNCTION is_my_org_admin()
    RETURNS BOOLEAN AS $$
    SELECT EXISTS (
      SELECT 1
      FROM user_profiles
      WHERE user_id = auth.uid()
      AND organization_id = get_my_organization_id()
      AND role = 'admin'
    );
    $$ LANGUAGE SQL SECURITY DEFINER;

    -- Trigger function to handle new user creation
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

    CREATE OR REPLACE FUNCTION handle_new_user()
    RETURNS TRIGGER AS $$
    DECLARE
      org_id UUID;
      first_name TEXT;
      last_name TEXT;
      organization_name TEXT;
    BEGIN
      -- Extract user metadata
      first_name := NEW.raw_user_meta_data->>'first_name';
      last_name := NEW.raw_user_meta_data->>'last_name';
      organization_name := NEW.raw_user_meta_data->>'organization_name';

      -- Create a new organization
      INSERT INTO organizations (name) VALUES (organization_name)
      RETURNING id INTO org_id;

      -- Create a user profile
      INSERT INTO user_profiles (user_id, organization_id, email, first_name, last_name)
      VALUES (NEW.id, org_id, NEW.email, first_name, last_name);

      -- Add the user to the organization_members table
      INSERT INTO organization_members (organization_id, user_id)
      VALUES (org_id, NEW.id);

      -- Create a new user in the users table
      INSERT INTO users (id, organization_id, first_name, last_name, email)
      VALUES (NEW.id, org_id, first_name, last_name, NEW.email);

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Trigger to run the handle_new_user function on user creation
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE handle_new_user();

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
