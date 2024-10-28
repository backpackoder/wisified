type EditorWrapperProps = {
  children: React.ReactNode;
};

export function EditorWrapper({ children }: EditorWrapperProps) {
  return (
    <article className="flex flex-col items-center justify-center gap-4 border-4">
      <h2 className="text-2xl">Editor</h2>

      <div className="flex flex-col gap-8">{children}</div>
    </article>
  );
}
