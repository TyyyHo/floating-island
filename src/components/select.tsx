export default function Select({
  id,
  options,
  handleParmas,
}: {
  id: string;
  options: string[];
  handleParmas: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="selectItem">
      <label>{id}</label>
      <select onChange={(e) => handleParmas(e.target.value)}>
        {options.map((element, index) => (
          <option key={index} value={element}>
            {element[0].toUpperCase() + element.substring(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
