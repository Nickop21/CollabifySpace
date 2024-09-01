import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		colors: {
			blue: {
			  100: '#B4C6EE',
			  400: '#417BFF',
			  500: '#3371FF',
			},
			red: {
			  400: '#DD4F56',
			  500: '#DC4349',
			},
			dark: {
			  100: '#09111F',
			  200: '#0B1527',
			  300: '#0F1C34',
			  350: '#12213B',
			  400: '#27344D',
			  500: '#2E3D5B',
			},
		  },
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
