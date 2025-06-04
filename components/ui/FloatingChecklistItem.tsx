import Image from "next/image"

export default function FloatingChecklistItem({
  left,
  top,
  text,
}: {
  left: string
  top: string
  text: string
}) {
  return (
    <div
      className="absolute z--1 flex items-center"
      style={{
        left,
        top,
        pointerEvents: "none"
      }}
    >
      <Image
        src="/check.svg"
        alt="Small Logo"
        width={28}
        height={28}
        className="mr-1 opacity-100"
      />
      <span className="text-lg text-primary font-semibold opacity-100">{text}</span>
    </div>
  )
}
