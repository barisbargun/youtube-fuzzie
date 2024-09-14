export interface IPlanConfig {
  title: string;
  price: number;
  desc: string;
  features: string[];
}

export const plansConfig: IPlanConfig[] = [
  {
    title: "Hobby",
    price: 0,
    desc: "Get a glimpse of what our software is capable of. Just a heads up you'll\" never leave us after this!",
    features: [
      "3 Free automations",
      "100 tasks per month",
      "Two-step Actions"
    ]
  },
  {
    title: "Pro Plan",
    price: 29,
    desc: "Get a glimpse of what our software is capable of. Just a heads up you'll\" never leave us after this!",
    features: [
      "10 Free automations",
      "10000 tasks per month",
      "Two-step Actions"
    ]
  },
  {
    title: "Unlimited",
    price: 99,
    desc: "Get a glimpse of what our software is capable of. Just a heads up you'll\" never leave us after this!",
    features: [
      "Unlimited Free automations",
      "Unlimited tasks per month",
      "Two-step Actions"
    ]
  }
]