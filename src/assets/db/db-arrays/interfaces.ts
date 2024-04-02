// Define the User interface
export interface User {
    userId?: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

/**** Recipe interface */
export interface Recipe {
    recipeId?: string;
    title: string;
    yield: number;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    isFavourited?: boolean;
    imageUrl?: string;
    place: {
        value: string;
        label: string;
    };
    ingredients: { ingredients: string[] }[];
    tips: { tips: string[] }[];
    instructions: { instructions: string[] }[];
}


/**** Option Interface for the filter */
export interface Option {
    value: string;
    label: string;
    selected?: boolean; // Optional for Dietary filter
};
