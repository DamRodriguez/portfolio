import { FloorType, FloorTypeText } from "@common/types/FloorType";
import { Product } from "@common/types/Product";
import { RugTexture, RugTextureText } from "@common/types/RugTexture";
import type { SubcategoryFiltersData } from "@/components/sections/catalog/subcategory/SubcategoryFiltersSection";

export const subcategoryFilters: Record<string, SubcategoryFiltersData[]> = {
  [Product.Alfombras]: [
    { text: RugTextureText.Boucle, filter: RugTexture.Boucle },
    { text: RugTextureText.PeloCortado, filter: RugTexture.PeloCortado },
    { text: RugTextureText.Carpeta, filter: RugTexture.Carpeta },
  ],
  [Product.PisosVinilicos]: [
    { text: FloorTypeText.Baldosas, filter: FloorType.Baldosas },
    { text: FloorTypeText.Listones, filter: FloorType.Listones },
  ],
};
