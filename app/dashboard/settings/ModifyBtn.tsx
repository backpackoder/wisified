export type ModifyButtonProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ModifyButton({ setIsEditing }: ModifyButtonProps) {
  return (
    <button
      className="bg-blue-300 text-sm p-2 rounded-lg mx-auto duration-150 hover:bg-blue-400"
      onClick={() => setIsEditing((prev) => !prev)}
    >
      Modify
    </button>
  );
}
