import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function start() {
  const PORT = Number(process.env.PORT) || 3333;
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "error", "warn"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.setGlobalPrefix("api");
  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:8000",
        "http://localhost:3000",
        "https://buyurtmam.uz",
        "https://api.buyurtmam.uz",
        "https://buyurtmam.vercal.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CROS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Buyurtmam API")
    .setDescription("Food delivery backend API")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: 'JWT tokenni kiriting (misol uchun, "Bearer <token>")',
        in: "header",
      },
      "JWT-auth"
    )
    .addSecurityRequirements("JWT-auth")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
    console.log(
      `Swagger documentation available at http://localhost:${PORT}/api/docs`
    );
  });
}

start();
