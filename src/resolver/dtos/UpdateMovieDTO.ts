import { Field } from "type-graphql";

export class UpdateMovieDTO {
    @Field(() => String, {nullable: true})
    title?: string 

    @Field(() => Number, {nullable: true})
    minutes?: number
}