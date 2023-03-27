import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  { config },
  {
    colors: {
      brand: {
        100: "#3d84f7",
      },
      color: "white",
    },
    styles: {
      global: () => ({
        body: {
          bg: "#436475",
        },
      }),
    },
  }
);
