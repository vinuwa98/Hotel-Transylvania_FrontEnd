import { themeColors } from "../../Theme/colors";
import Button from "../../Components/atoms/Button";
import DropdownList from "../../Components/atoms/DropdownList";

function JobsSection() {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Manage Jobs</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <Button
          label={"Delete Job"}
          style={{
            backgroundColor: themeColors.Blue3rd,
            color: themeColors.White,
          }}
          className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
        />
        <DropdownList
          name={`job-priority`}
          options={[
            { label: "Open", value: "open" },
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
          ]}
        />
      </div>
    </div>
  );
}

export default JobsSection;
