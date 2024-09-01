import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="">
     <Header>
      <div className="flex w-fit items-center justify-center gap-2">
        <p className="document-title">This</p>
      </div>
     </Header>
     <Editor/>
    </main>
  );
}
