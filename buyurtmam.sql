CREATE TABLE "categories" (
    "id" BIGINT NOT NULL,
    "restaurant_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BIGINT NOT NULL
);

ALTER TABLE "categories" ADD PRIMARY KEY ("id");

CREATE TABLE "delivery_tracking" (
    "id" BIGINT NOT NULL,
    "courier_id" BIGINT NOT NULL,
    "order_id" BIGINT NULL,
    "lat" DECIMAL(8, 2) NOT NULL,
    "lng" DECIMAL(8, 2) NOT NULL
);

ALTER TABLE "delivery_tracking" ADD PRIMARY KEY ("id");

CREATE TABLE "delivery_ratings" (
    "id" BIGINT NOT NULL,
    "order_id" BIGINT NOT NULL,
    "courier_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "rating" VARCHAR(255) CHECK (
        "rating" IN ('1', '2', '3', '4', '5')
    ) NOT NULL,
    "comment" TEXT NOT NULL
);

ALTER TABLE "delivery_ratings" ADD PRIMARY KEY ("id");

CREATE TABLE "payments" (
    "id" BIGINT NOT NULL,
    "order_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "amount" DECIMAL(8, 2) NOT NULL,
    "paid_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "status" BIGINT NOT NULL,
    "method_id" BIGINT NOT NULL
);

ALTER TABLE "payments" ADD PRIMARY KEY ("id");

CREATE TABLE "cart" (
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "restaurant_id" BIGINT NOT NULL,
    "status" VARCHAR(255) CHECK ("status" IN ('')) NOT NULL,
    "notes" TEXT NOT NULL,
    "delivery_fee" DECIMAL(8, 2) NOT NULL,
    "subtotal" DECIMAL(8, 2) NOT NULL
);

ALTER TABLE "cart" ADD PRIMARY KEY ("id");

CREATE TABLE "cart_items" (
    "id" BIGINT NOT NULL,
    "cart_id" BIGINT NOT NULL,
    "dish_id" BIGINT NOT NULL,
    "quantity" SMALLINT NOT NULL
);

ALTER TABLE "cart_items" ADD PRIMARY KEY ("id");

CREATE TABLE "customers" (
    "user_id" BIGINT NOT NULL DEFAULT 'autoincrement',
    "avatar_url" VARCHAR(255) NULL,
    "activation_link" VARCHAR(255) NULL DEFAULT 'UUID',
    "date_of_birth" DATE NULL,
    "gender" VARCHAR(255) CHECK (
        "gender" IN ('male', 'female')
    ) NULL,
);

ALTER TABLE "customers" ADD PRIMARY KEY ("user_id");

CREATE TABLE "settings" (
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "ui_theme_mode" VARCHAR(255) CHECK (
        "ui_theme_mode" IN ('dark', 'light', 'auto')
    ) NULL DEFAULT 'auto',
    "notifications_enabled" BOOLEAN NULL DEFAULT '1',
    "sms_notifications" BOOLEAN NULL DEFAULT '1',
    "email_notifications" BOOLEAN NULL DEFAULT '1',
    "push_notifications" BIGINT NULL DEFAULT 'true',
    "promo_notifications" BOOLEAN NULL DEFAULT '1',
    "order_notifications" BOOLEAN NULL DEFAULT '1',
    "default_payment_method_id" BIGINT NOT NULL,
    "default_address_id" BIGINT NULL,
    "delivery_instructions" TEXT NULL
);

ALTER TABLE "settings" ADD PRIMARY KEY ("id");

CREATE TABLE "addresses" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DECIMAL(8, 2) NOT NULL,
    "lng" DECIMAL(8, 2) NOT NULL,
    "customer_id" BIGINT NOT NULL
);

ALTER TABLE "addresses" ADD PRIMARY KEY ("id");

CREATE TABLE "payment_methods" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) CHECK (
        "type" IN ('offline', 'online', 'NFC')
    ) NOT NULL,
    "is_active" BOOLEAN NULL DEFAULT '1',
    "logo_url" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);

ALTER TABLE "payment_methods" ADD PRIMARY KEY ("id");

CREATE TABLE "users" (
    "id" BIGINT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "hashed_refresh_token" VARCHAR(255) NULL,
    "hashed_password" VARCHAR(255) NULL,
    "is_active" BOOLEAN NOT NULL,
    "two_factor_enabled" BOOLEAN NULL DEFAULT '0',
    "role" VARCHAR(255) CHECK (
        "role" IN (
            'admins',
            'restaurant_admins',
            'couriers',
            'cutomers'
        )
    ) NOT NULL
);

ALTER TABLE "users" ADD PRIMARY KEY ("id");

ALTER TABLE "users"
ADD CONSTRAINT "users_email_unique" UNIQUE ("email");

ALTER TABLE "users"
ADD CONSTRAINT "users_phone_unique" UNIQUE ("phone");

CREATE TABLE "admins" (
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "last_sign_in" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "admins" ADD PRIMARY KEY ("user_id");

CREATE TABLE "roles" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NULL
);

ALTER TABLE "roles" ADD PRIMARY KEY ("id");

CREATE TABLE "couriers" (
    "user_id" BIGINT NOT NULL,
    "vehicle_type" VARCHAR(255) CHECK ("vehicle_type" IN ('')) NOT NULL,
    "license_plate" VARCHAR(255) NOT NULL,
    "passport_id" BIGINT NOT NULL,
    "birth_date" DATE NOT NULL,
    "profile_photo_url" VARCHAR(255) NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "current_lat" DECIMAL(8, 2) NOT NULL,
    "current_lng" DECIMAL(8, 2) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "hired_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "couriers" ADD PRIMARY KEY ("user_id");

CREATE TABLE "restaurants" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DECIMAL(8, 2) NOT NULL,
    "lng" DECIMAL(8, 2) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL
);

ALTER TABLE "restaurants" ADD PRIMARY KEY ("id");

CREATE TABLE "restaurant_admins" (
    "user_id" BIGINT NOT NULL,
    "is_superadmin" BOOLEAN NOT NULL,
    "restaurant_id" BIGINT NOT NULL
);

ALTER TABLE "restaurant_admins" ADD PRIMARY KEY ("user_id");

CREATE TABLE "orders" (
    "id" BIGINT NOT NULL,
    "cart_id" BIGINT NOT NULL,
    "courier_id" BIGINT NOT NULL,
    "delivery_address_id" BIGINT NOT NULL,
    "total_price" DECIMAL(8, 2) NOT NULL,
    "status_id" BIGINT NOT NULL,
    "delivered_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "orders" ADD PRIMARY KEY ("id");

CREATE TABLE "order_status" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);

ALTER TABLE "order_status" ADD PRIMARY KEY ("id");

CREATE TABLE "dish_ingredients" (
    "id" BIGINT NOT NULL,
    "ingredients_id" BIGINT NOT NULL,
    "dish_id" BIGINT NOT NULL
);

ALTER TABLE "dish_ingredients" ADD PRIMARY KEY ("id");

CREATE TABLE "dishes" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "gramm" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "restaurant_id" BIGINT NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "cooking_time_minutes" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL
);

ALTER TABLE "dishes" ADD PRIMARY KEY ("id");

CREATE TABLE "ingredients" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "reataurant_id" BIGINT NOT NULL
);

ALTER TABLE "ingredients" ADD PRIMARY KEY ("id");

ALTER TABLE "ingredients"
ADD CONSTRAINT "ingredients_reataurant_id_foreign" FOREIGN KEY ("reataurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "dishes"
ADD CONSTRAINT "dishes_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "cart_items"
ADD CONSTRAINT "cart_items_dish_id_foreign" FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");

ALTER TABLE "categories"
ADD CONSTRAINT "categories_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "delivery_ratings"
ADD CONSTRAINT "delivery_ratings_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "admins"
ADD CONSTRAINT "admins_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "admins"
ADD CONSTRAINT "admins_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "couriers"
ADD CONSTRAINT "couriers_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payments"
ADD CONSTRAINT "payments_order_id_foreign" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "cart"
ADD CONSTRAINT "cart_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "dishes"
ADD CONSTRAINT "dishes_category_id_foreign" FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "delivery_tracking"
ADD CONSTRAINT "delivery_tracking_order_id_foreign" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "dish_ingredients"
ADD CONSTRAINT "dish_ingredients_ingredients_id_foreign" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients" ("id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_status_id_foreign" FOREIGN KEY ("status_id") REFERENCES "order_status" ("id");

ALTER TABLE "cart"
ADD CONSTRAINT "cart_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "settings"
ADD CONSTRAINT "settings_default_payment_method_id_foreign" FOREIGN KEY ("default_payment_method_id") REFERENCES "payment_methods" ("id");

ALTER TABLE "dish_ingredients"
ADD CONSTRAINT "dish_ingredients_dish_id_foreign" FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");

ALTER TABLE "restaurant_admins"
ADD CONSTRAINT "restaurant_admins_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "delivery_tracking"
ADD CONSTRAINT "delivery_tracking_courier_id_foreign" FOREIGN KEY ("courier_id") REFERENCES "couriers" ("user_id");

ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "delivery_ratings"
ADD CONSTRAINT "delivery_ratings_courier_id_foreign" FOREIGN KEY ("courier_id") REFERENCES "couriers" ("user_id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_cart_id_foreign" FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "customers"
ADD CONSTRAINT "customers_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payments"
ADD CONSTRAINT "payments_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "settings"
ADD CONSTRAINT "settings_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_courier_id_foreign" FOREIGN KEY ("courier_id") REFERENCES "couriers" ("user_id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_delivery_address_id_foreign" FOREIGN KEY ("delivery_address_id") REFERENCES "addresses" ("id");

ALTER TABLE "restaurant_admins"
ADD CONSTRAINT "restaurant_admins_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "settings"
ADD CONSTRAINT "settings_default_address_id_foreign" FOREIGN KEY ("default_address_id") REFERENCES "addresses" ("id");

ALTER TABLE "cart_items"
ADD CONSTRAINT "cart_items_cart_id_foreign" FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "payments"
ADD CONSTRAINT "payments_method_id_foreign" FOREIGN KEY ("method_id") REFERENCES "payment_methods" ("id");

ALTER TABLE "delivery_ratings"
ADD CONSTRAINT "delivery_ratings_order_id_foreign" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

CREATE TABLE "categories" (
    "id" BIGINT NOT NULL,
    "restaurant_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BIGINT NOT NULL
);

ALTER TABLE "categories" ADD PRIMARY KEY ("id");

CREATE TABLE "delivery_tracking" (
    "id" BIGINT NOT NULL,
    "courier_id" BIGINT NOT NULL,
    "order_id" BIGINT NULL,
    "lat" DECIMAL(8, 2) NOT NULL,
    "lng" DECIMAL(8, 2) NOT NULL
);

ALTER TABLE "delivery_tracking" ADD PRIMARY KEY ("id");

CREATE TABLE "delivery_ratings" (
    "id" BIGINT NOT NULL,
    "order_id" BIGINT NOT NULL,
    "courier_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "rating" VARCHAR(255) CHECK (
        "rating" IN ('1', '2', '3', '4', '5')
    ) NOT NULL,
    "comment" TEXT NOT NULL
);

ALTER TABLE "delivery_ratings" ADD PRIMARY KEY ("id");

CREATE TABLE "payments" (
    "id" BIGINT NOT NULL,
    "order_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "amount" DECIMAL(8, 2) NOT NULL,
    "paid_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "status" BIGINT NOT NULL,
    "method_id" BIGINT NOT NULL
);

ALTER TABLE "payments" ADD PRIMARY KEY ("id");

CREATE TABLE "cart" (
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "restaurant_id" BIGINT NOT NULL,
    "status" VARCHAR(255) CHECK ("status" IN ('')) NOT NULL,
    "notes" TEXT NOT NULL,
    "delivery_fee" DECIMAL(8, 2) NOT NULL,
    "subtotal" DECIMAL(8, 2) NOT NULL
);

ALTER TABLE "cart" ADD PRIMARY KEY ("id");

CREATE TABLE "cart_items" (
    "id" BIGINT NOT NULL,
    "cart_id" BIGINT NOT NULL,
    "dish_id" BIGINT NOT NULL,
    "quantity" SMALLINT NOT NULL
);

ALTER TABLE "cart_items" ADD PRIMARY KEY ("id");

CREATE TABLE "customers" (
    "user_id" BIGINT NOT NULL DEFAULT 'autoincrement',
    "avatar_url" VARCHAR(255) NULL,
    "activation_link" VARCHAR(255) NULL DEFAULT 'UUID',
    "date_of_birth" DATE NULL,
    "gender" VARCHAR(255) CHECK (
        "gender" IN ('male', 'female')
    ) NULL,
);

ALTER TABLE "customers" ADD PRIMARY KEY ("user_id");

CREATE TABLE "settings" (
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "ui_theme_mode" VARCHAR(255) CHECK (
        "ui_theme_mode" IN ('dark', 'light', 'auto')
    ) NULL DEFAULT 'auto',
    "notifications_enabled" BOOLEAN NULL DEFAULT '1',
    "sms_notifications" BOOLEAN NULL DEFAULT '1',
    "email_notifications" BOOLEAN NULL DEFAULT '1',
    "push_notifications" BIGINT NULL DEFAULT 'true',
    "promo_notifications" BOOLEAN NULL DEFAULT '1',
    "order_notifications" BOOLEAN NULL DEFAULT '1',
    "default_payment_method_id" BIGINT NOT NULL,
    "default_address_id" BIGINT NULL,
    "delivery_instructions" TEXT NULL
);

ALTER TABLE "settings" ADD PRIMARY KEY ("id");

CREATE TABLE "addresses" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DECIMAL(8, 2) NOT NULL,
    "lng" DECIMAL(8, 2) NOT NULL,
    "customer_id" BIGINT NOT NULL
);

ALTER TABLE "addresses" ADD PRIMARY KEY ("id");

CREATE TABLE "payment_methods" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) CHECK (
        "type" IN ('offline', 'online', 'NFC')
    ) NOT NULL,
    "is_active" BOOLEAN NULL DEFAULT '1',
    "logo_url" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);

ALTER TABLE "payment_methods" ADD PRIMARY KEY ("id");

CREATE TABLE "users" (
    "id" BIGINT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "hashed_refresh_token" VARCHAR(255) NULL,
    "hashed_password" VARCHAR(255) NULL,
    "is_active" BOOLEAN NOT NULL,
    "two_factor_enabled" BOOLEAN NULL DEFAULT '0',
    "role" VARCHAR(255) CHECK (
        "role" IN (
            'admins',
            'restaurant_admins',
            'couriers',
            'cutomers'
        )
    ) NOT NULL
);

ALTER TABLE "users" ADD PRIMARY KEY ("id");

ALTER TABLE "users"
ADD CONSTRAINT "users_email_unique" UNIQUE ("email");

ALTER TABLE "users"
ADD CONSTRAINT "users_phone_unique" UNIQUE ("phone");

CREATE TABLE "admins" (
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "last_sign_in" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "admins" ADD PRIMARY KEY ("user_id");

CREATE TABLE "roles" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NULL
);

ALTER TABLE "roles" ADD PRIMARY KEY ("id");

CREATE TABLE "couriers" (
    "user_id" BIGINT NOT NULL,
    "vehicle_type" VARCHAR(255) CHECK ("vehicle_type" IN ('')) NOT NULL,
    "license_plate" VARCHAR(255) NOT NULL,
    "passport_id" BIGINT NOT NULL,
    "birth_date" DATE NOT NULL,
    "profile_photo_url" VARCHAR(255) NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "current_lat" DECIMAL(8, 2) NOT NULL,
    "current_lng" DECIMAL(8, 2) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "hired_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "couriers" ADD PRIMARY KEY ("user_id");

CREATE TABLE "restaurants" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DECIMAL(8, 2) NOT NULL,
    "lng" DECIMAL(8, 2) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL
);

ALTER TABLE "restaurants" ADD PRIMARY KEY ("id");

CREATE TABLE "restaurant_admins" (
    "user_id" BIGINT NOT NULL,
    "is_superadmin" BOOLEAN NOT NULL,
    "restaurant_id" BIGINT NOT NULL
);

ALTER TABLE "restaurant_admins" ADD PRIMARY KEY ("user_id");

CREATE TABLE "orders" (
    "id" BIGINT NOT NULL,
    "cart_id" BIGINT NOT NULL,
    "courier_id" BIGINT NOT NULL,
    "delivery_address_id" BIGINT NOT NULL,
    "total_price" DECIMAL(8, 2) NOT NULL,
    "status_id" BIGINT NOT NULL,
    "delivered_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "orders" ADD PRIMARY KEY ("id");

CREATE TABLE "order_status" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);

ALTER TABLE "order_status" ADD PRIMARY KEY ("id");

CREATE TABLE "dish_ingredients" (
    "id" BIGINT NOT NULL,
    "ingredients_id" BIGINT NOT NULL,
    "dish_id" BIGINT NOT NULL
);

ALTER TABLE "dish_ingredients" ADD PRIMARY KEY ("id");

CREATE TABLE "dishes" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "gramm" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "restaurant_id" BIGINT NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "cooking_time_minutes" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL
);

ALTER TABLE "dishes" ADD PRIMARY KEY ("id");

CREATE TABLE "ingredients" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "reataurant_id" BIGINT NOT NULL
);

ALTER TABLE "ingredients" ADD PRIMARY KEY ("id");

ALTER TABLE "ingredients"
ADD CONSTRAINT "ingredients_reataurant_id_foreign" FOREIGN KEY ("reataurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "dishes"
ADD CONSTRAINT "dishes_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "cart_items"
ADD CONSTRAINT "cart_items_dish_id_foreign" FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");

ALTER TABLE "categories"
ADD CONSTRAINT "categories_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "delivery_ratings"
ADD CONSTRAINT "delivery_ratings_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "admins"
ADD CONSTRAINT "admins_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "admins"
ADD CONSTRAINT "admins_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "couriers"
ADD CONSTRAINT "couriers_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payments"
ADD CONSTRAINT "payments_order_id_foreign" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "cart"
ADD CONSTRAINT "cart_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "dishes"
ADD CONSTRAINT "dishes_category_id_foreign" FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "delivery_tracking"
ADD CONSTRAINT "delivery_tracking_order_id_foreign" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "dish_ingredients"
ADD CONSTRAINT "dish_ingredients_ingredients_id_foreign" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients" ("id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_status_id_foreign" FOREIGN KEY ("status_id") REFERENCES "order_status" ("id");

ALTER TABLE "cart"
ADD CONSTRAINT "cart_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "settings"
ADD CONSTRAINT "settings_default_payment_method_id_foreign" FOREIGN KEY ("default_payment_method_id") REFERENCES "payment_methods" ("id");

ALTER TABLE "dish_ingredients"
ADD CONSTRAINT "dish_ingredients_dish_id_foreign" FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");

ALTER TABLE "restaurant_admins"
ADD CONSTRAINT "restaurant_admins_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "delivery_tracking"
ADD CONSTRAINT "delivery_tracking_courier_id_foreign" FOREIGN KEY ("courier_id") REFERENCES "couriers" ("user_id");

ALTER TABLE "addresses"
ADD CONSTRAINT "addresses_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "delivery_ratings"
ADD CONSTRAINT "delivery_ratings_courier_id_foreign" FOREIGN KEY ("courier_id") REFERENCES "couriers" ("user_id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_cart_id_foreign" FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "customers"
ADD CONSTRAINT "customers_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payments"
ADD CONSTRAINT "payments_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "settings"
ADD CONSTRAINT "settings_customer_id_foreign" FOREIGN KEY ("customer_id") REFERENCES "customers" ("user_id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_courier_id_foreign" FOREIGN KEY ("courier_id") REFERENCES "couriers" ("user_id");

ALTER TABLE "orders"
ADD CONSTRAINT "orders_delivery_address_id_foreign" FOREIGN KEY ("delivery_address_id") REFERENCES "addresses" ("id");

ALTER TABLE "restaurant_admins"
ADD CONSTRAINT "restaurant_admins_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");

ALTER TABLE "settings"
ADD CONSTRAINT "settings_default_address_id_foreign" FOREIGN KEY ("default_address_id") REFERENCES "addresses" ("id");

ALTER TABLE "cart_items"
ADD CONSTRAINT "cart_items_cart_id_foreign" FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "payments"
ADD CONSTRAINT "payments_method_id_foreign" FOREIGN KEY ("method_id") REFERENCES "payment_methods" ("id");

ALTER TABLE "delivery_ratings"
ADD CONSTRAINT "delivery_ratings_order_id_foreign" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");