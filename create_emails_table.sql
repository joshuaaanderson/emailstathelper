-- Table: public.emails

-- DROP TABLE IF EXISTS public.emails;

CREATE TABLE IF NOT EXISTS public.emails
(
    date_received text COLLATE pg_catalog."default",
    email_from text COLLATE pg_catalog."default",
    subject text COLLATE pg_catalog."default",
    source text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.emails
    OWNER to postgres;
