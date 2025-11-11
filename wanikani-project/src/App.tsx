import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { startQuiz } from "./lib/startQuiz"
import { RippleButton } from "@/components/ui/shadcn-io/ripple-button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";


function App() {
  const [mode, setMode] = useState("radicals")
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
          <RadioGroupItem value="radicals" id="radicals" />
          <Label htmlFor="option-one">Radicals</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="kanji" id="kanji" />
          <Label htmlFor="kanji">Kanji</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="vocab" id="vocab" />
          <Label htmlFor="vocab">Vocabulary</Label>
        </div>
      </RadioGroup>
      <RippleButton size="lg" onClick={() => startQuiz(mode)}>Start Quiz</RippleButton>
    </div>
  )
}

export default App