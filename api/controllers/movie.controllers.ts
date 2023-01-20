import { Request, Response } from "express";
import MoviesService from "../services/movie.services";
const { getSpecificService, getPopularService, getOneService } = MoviesService;

class MoviesController {
  static async getSpecific(req: Request, res: Response) {
    const { search } = req.body;
    const { error, data } = await getSpecificService(search);

    if (error) {
      return res.status(500).json({ message: data.status_message });
    }
    res.status(200).json(data);
  }

  static async getPopular(req: Request, res: Response) {
    const { error, data } = await getPopularService();

    if (error) {
      return res.status(500).json({ message: data.status_message });
    }
    res.status(200).send(data);
  }

  static async getOne(req: Request, res: Response) {
    const { id, typeFilm } = req.params;
    const { error, data } = await getOneService(id, typeFilm);

    if (error) {
      return res.status(500).json({ message: data.status_message });
    }

    res.status(200).json(data);
  }
}

export default MoviesController;
