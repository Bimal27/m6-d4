import { Sequelize } from "sequelize";

const { PGPORT, PGHOST, PGPASSWORD, PGUSER, PGDDATABASE } = process.env;

const sequelize = new Sequelize(PGDDATABASE, PGUSER, PGPASSWORD, {
    port: PGPORT,
    host: PGHOST,
    dialect: "postgres",
})
export const connectDB = async () => {
    try {
      await sequelize.sync();
      console.log("DB connected");
    } catch (error) {
      console.log(error);
    }
  };
  
  export default sequelize;