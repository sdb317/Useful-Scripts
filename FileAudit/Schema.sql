begin;

create table "file" (
    "id" serial not null primary key, 
    "name" varchar(160) collate pg_catalog."default",
    "extension" varchar(20) collate pg_catalog."default",
    "path" varchar(300) collate pg_catalog."default",
    "size" bigint,
    "modified" char(19),
    "checksum" int,
    "copied" char(1)
)
with (
    oids = false
)
tablespace pg_default;

commit;
