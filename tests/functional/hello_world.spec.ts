import { test } from "@japa/runner";

test("response api status", async ({ client }) => {
  const response = await client.get("/");

  response.assertStatus(200);
  response.assertBodyContains({ message: "API Running!" });
});
