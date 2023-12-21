import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Clinic from "App/Models/Clinic";

export default class ClinicsController {
  public async getClinicReport({ response, auth }: HttpContextContract) {
    if (auth.user) {
      const clinicData = await Clinic.query()
        .preload("sellingTransactions", (tmp) => {
          tmp
            .whereRaw("DATE(created_at) = ?", [
              `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            ])
            .orderBy("created_at", "desc");
        })
        .preload("stocks", (tmp) => {
          tmp.preload("stockBatches", (tmp) => {
            tmp.whereRaw("DATE(expired) = ?", [
              `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            ]);
          });
        })
        .where("id", auth.user.clinicId);

      return response.ok({ data: clinicData });
    }
  }
}
