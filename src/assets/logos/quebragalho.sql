CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"phone" TEXT NOT NULL UNIQUE,
	"city" TEXT NOT NULL,
	"cpf" TEXT NOT NULL UNIQUE,
	"zipcode" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.services" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"pictureMain" integer NOT NULL,
	"price" integer NOT NULL,
	"createdBy" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"available" BOOLEAN NOT NULL,
	"categoryId" integer NOT NULL,
	CONSTRAINT "services_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.category" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "category_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.pictures" (
	"id" serial NOT NULL,
	"createdBy" integer NOT NULL,
	"url" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "pictures_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "services" ADD CONSTRAINT "services_fk0" FOREIGN KEY ("pictureMain") REFERENCES "pictures"("id");
ALTER TABLE "services" ADD CONSTRAINT "services_fk1" FOREIGN KEY ("createdBy") REFERENCES "users"("id");
ALTER TABLE "services" ADD CONSTRAINT "services_fk2" FOREIGN KEY ("categoryId") REFERENCES "category"("id");


ALTER TABLE "pictures" ADD CONSTRAINT "pictures_fk0" FOREIGN KEY ("createdBy") REFERENCES "services"("id");





