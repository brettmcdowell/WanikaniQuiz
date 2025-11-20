import { Route, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RippleButton } from "@/components/ui/shadcn-io/ripple-button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";


function LandingPage() {
  const [mode, setMode] = useState("radicals")
  const navigate = useNavigate();
  const handleStart = () => {
    navigate({
      to: '/quiz',
      search: { mode },
    });
  };
  return (
      <div className="flex min-h-svh flex-col items-center justify-center space-y-6">
      <ContainerTextFlip
      words={["Wanikani Freeform", "ワニカニ フリーフォーム"]}
      />
      <RadioGroup 
        value={mode}
        onValueChange={setMode}
        className="space-y-3"
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="radical" id="radicals" />
          <Label htmlFor="option-one">Radicals</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="kanji" id="kanji" />
          <Label htmlFor="kanji">Kanji</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="vocabulary" id="vocab" />
          <Label htmlFor="vocabulary">Vocabulary</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="Context Sentences" id="context" />
          <Label htmlFor="context">Context Sentences</Label>
        </div>
      </RadioGroup>
      <RippleButton size="lg" onClick={handleStart}>Start Quiz</RippleButton>
    </div>
  )
}

export const LandingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

export default LandingPage;