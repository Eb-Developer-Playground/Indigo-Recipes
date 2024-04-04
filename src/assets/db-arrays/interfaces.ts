// Define the User interface
export interface User {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

/**** Recipe interface */
export interface Recipe {
    owner?: string | null;
    recipeId: number;
    title: string;
    yield: number;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    comments: Comment[];
    isFavourited?: boolean;
    rating: number;
    imageUrl: string;
    place: {
        value: string;
        label: string;
    };
    ingredients: ingredients[];
    tips: tips[];
    instructions: instructions[];
}

export interface Comment {
    sender: string;
    text: string;
}

/***** Ingredients Interface */
export interface ingredients {
    ingredient: string,
}

/***** Tips interface */
export interface tips {
    tip: string
}

/**** * Instructions interface */
export interface instructions {
    instruction: string,
}


/**** Option Interface for the filter */
export interface Option {
    value: string;
    label: string;
    selected?: boolean; // Optional for Dietary filter
};




/******************************************************************************************************** */
export const usersArray: User[] = [];