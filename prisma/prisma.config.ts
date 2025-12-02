import {prismaConfig} from "prisma"
export default prismaConfig({
    datasources:{
        db:{
            url:process.env.DATABASE_URL!,
        },
    }
})