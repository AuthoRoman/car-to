import * as React from "react";

function ArrowRight({ ...props }: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.000000pt"
      height="28.000000pt"
      viewBox="0 0 48.000000 48.000000"
      {...props}
    >
      <path
        d="M172 429c-48-14-109-80-123-131-23-89 12-182 88-229 57-36 154-34 210 3 62 41 88 90 88 168 0 77-26 127-85 166-43 29-125 39-178 23zm148-42c51-27 90-90 90-147 0-87-83-170-170-170S70 153 70 240c0 20 10 56 23 80 27 51 90 90 147 90 20 0 56-10 80-23z"
        transform="matrix(.1 0 0 -.1 0 48)"
      />
      <path
        d="M240 301c0-5 7-14 15-21 27-22 16-30-45-30-33 0-60-4-60-9 0-14 27-21 77-21 44 0 45-1 30-18-42-46-1-43 43 3l34 35-34 35c-32 33-60 45-60 26z"
        transform="matrix(.1 0 0 -.1 0 48)"
      />
    </svg>
  );
}

export default ArrowRight;
