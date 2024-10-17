import { onRunMigrations } from "./migrations";

const main = async () => {
  await onRunMigrations();
};
main();
