import { Request, Response } from "express";
import MoviesService from "../services/movie.services";
const { getSpecificService, getPopularService, getOneService } = MoviesService;

class MoviesController {
  static async getSpecific(req: Request, res: Response) {
    const { search } = req.body;
    const { error, data } = await getSpecificService(search);

    if (error) {
      return res.status(data.status || 500).json({ message: data.message });
    }
    res.status(data.status || 200).json(data);
  }

  static async getPopular(req: Request, res: Response) {
    const { error, data } = await getPopularService();

    if (error) {
      return res.status(data.status || 500).json({ message: data.message });
    }

    res.json(data);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const { error, data } = await getOneService(id);

    if (error) {
      return res.status(data.status || 500).json({ message: data.message });
    }

    res.json(data);
  }
}

export default MoviesController;
