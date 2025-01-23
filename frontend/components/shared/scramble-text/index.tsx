import { ScrambleHover } from "@/components/shared/scramble-hover"

interface ScrambleLinkProps {
  text: string
  scrambleSpeed?: number
}

export function ScrambleText({ text, scrambleSpeed = 60 }: ScrambleLinkProps) {
  return (
    <span className="inline-grid col-span-1">
      <span className="row-start-1 col-start-1 opacity-0 pointer-events-none">{text}</span>
      <ScrambleHover
        className="row-start-1 col-start-1"
        text={text}
        scrambleSpeed={scrambleSpeed}
        sequential={true}
        revealDirection="start"
        useOriginalCharsOnly={false}
        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
      />
    </span>
  )
}
