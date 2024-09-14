import { DM_Sans, Poppins } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });

export default [dm_sans.variable, poppins.variable];