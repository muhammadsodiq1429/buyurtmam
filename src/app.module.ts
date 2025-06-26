import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminsModule } from "./admins/admins.module";
import { CouriersModule } from "./couriers/couriers.module";
import { RolesModule } from "./roles/roles.module";
import { CustomersModule } from "./customers/customers.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { RestaurantAdminsModule } from "./restaurant-admins/restaurant-admins.module";
import { DishesModule } from "./dishes/dishes.module";
import { DishIngredientsModule } from "./dish-ingredients/dish-ingredients.module";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { CategoriesModule } from "./categories/categories.module";
import { AddressesModule } from "./addresses/addresses.module";
import { CartModule } from "./cart/cart.module";
import { CartItemsModule } from "./cart-items/cart-items.module";
import { OrdersModule } from "./orders/orders.module";
import { OrderStatusModule } from "./order-status/order-status.module";
import { DeliveryTrackingModule } from "./delivery-tracking/delivery-tracking.module";
import { DeliveryRatingsModule } from "./delivery-ratings/delivery-ratings.module";
import { PaymentsModule } from "./payments/payments.module";
import { PaymentMethodsModule } from "./payment-methods/payment-methods.module";
import { SettingsModule } from "./settings/settings.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { Customer } from "./customers/models/customer.model";
import { Courier } from "./couriers/models/courier.model";
import { Role } from "./roles/models/role.model";
import { RestaurantAdmin } from "./restaurant-admins/models/restaurant-admin.model";
import { Admin } from "./admins/models/admin.model";
import { Restaurant } from "./restaurants/models/restaurant.model";
import { Address } from "./addresses/models/address.model";
import { PaymentMethod } from "./payment-methods/models/payment-method.model";
import { Setting } from "./settings/models/setting.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_POTR),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadModels: true,
      logging: false,
      models: [
        Admin,
        Courier,
        Role,
        Customer,
        RestaurantAdmin,
        User,
        Restaurant,
        Address,
        PaymentMethod,
        Setting,
      ],
      sync: { alter: true },
    }),
    AdminsModule,
    CouriersModule,
    RolesModule,
    CustomersModule,
    RestaurantsModule,
    RestaurantAdminsModule,
    DishesModule,
    DishIngredientsModule,
    IngredientsModule,
    CategoriesModule,
    AddressesModule,
    CartModule,
    CartItemsModule,
    OrdersModule,
    OrderStatusModule,
    DeliveryTrackingModule,
    DeliveryRatingsModule,
    PaymentsModule,
    PaymentMethodsModule,
    SettingsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
