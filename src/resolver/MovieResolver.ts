import { Movie } from "src/entities/Movie";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { UpdateMovieDTO } from "./dtos/UpdateMovieDTO";

@Resolver()
export class MovieResolver {
  constructor(private moviesRepository: Repository<Movie>) {}

  @Mutation(() => Movie)
  async creteMovie(
    @Arg("title", () => String) title: string,
    @Arg("minutes", () => Int) minutes: number
  ) {
    const movie = this.moviesRepository.create({
      title,
      minutes,
    });
    return movie;
  }

  @Query(() => Movie)
  async OneMovie(@Arg("id", () => Number) id: number) {
    const movieFounded = await this.moviesRepository.findOne({ where: { id } });
    return movieFounded;
  }

  @Mutation(() => Movie )
  async updateMovie(
    @Arg("options", () => UpdateMovieDTO) options: UpdateMovieDTO,
    @Arg("id", () => Number) id: number
  ) {
    const movieupdated = await this.moviesRepository.update(id, options)
    return movieupdated;
  }

  @Query(() => [Movie])
  async movies() {
    return await this.moviesRepository.find()
  }

  @Mutation(() => Boolean)
  async DeleteMovie(@Arg("id", () => Number) id: number) {
      await this.moviesRepository.delete(id)
      return true
  }
}

