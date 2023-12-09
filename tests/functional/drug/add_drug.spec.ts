import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import { FactoryInput } from "App/Interfaces/Input";
import { ClinicFactory } from "Database/factories/ClinicFactory";

test.group("Add drug", (group)=> {
    group.each.setup(async()=> {
        await Database.beginGlobalTransaction();

        return () => Database.rollbackGlobalTransaction();
    });
    test("should response status code 401 when token not provided", async ({
        client,
    }) => {
        const res = await client.post('/drug');
        res.assertStatus(401)
    })
})