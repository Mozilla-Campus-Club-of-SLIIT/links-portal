CREATE TABLE "Link" (
    "name" VARCHAR(30) PRIMARY KEY NOT NULL,
    "redirect" VARCHAR(500) NOT NULL,
    "description" VARCHAR(250),
    "pinned" BOOLEAN DEFAULT FALSE,
    "createdBy" VARCHAR(50) NOT NULL,
    "views" INT DEFAULT 0
);
