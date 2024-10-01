interface Option {
  value: string
  label: string
  disable?: boolean
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

type State = {
  googleFile: any;
  slackChannels: Option[];
  selectedSlackChannels: string[];
}

type Actions = {
  setGoogleFile: (googleFile: any) => void
  setSlackChannels: (slackChannels: Option[]) => void
  setSelectedSlackChannels: (selectedSlackChannels: string[]) => void
}
