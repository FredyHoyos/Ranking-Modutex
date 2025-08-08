
import Button from "@/app/component/atoms/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2 className="text-3xl font-bold text-center sm:text-left">
          <div className="flex flex-col gap-4">
            Welcome to the Next.js App! fin
            <Button text="Fredy" />
            <Button text="Santiago" />
            <Button text="Gonzalez" />
            <Button text="Developer" />
          </div>
          
        </h2>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
