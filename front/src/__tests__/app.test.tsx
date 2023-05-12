import React, { useState } from "react";
// Lets us render a component and send queries
import { render, screen } from "@testing-library/react";
// Lets us send user events
import userEvent from "@testing-library/user-event";
// Lets us check whether an element is within another element
import { within } from "@testing-library/dom";
// Lets us use 'toBeInTheDocument()'
import "@testing-library/jest-dom";

import App from "../App";
import Export from "../components/actions/Export";
import Info from "../components/actions/Info";
import ClassOf from "../components/preferences/ClassOf";
import ClassOption from "../components/preferences/ClassOption";
import Pathways from "../components/preferences/Pathways";
import Search from "../components/preferences/Search";
import ClassBox from "../components/schedule/ClassBox";
import SemYear from "../components/schedule/SemYear";
import SemYearHeader from "../components/schedule/SemYearHeader";

beforeEach(() => {
  render(<App />);
});

test("renders all components", async () => {
  const GradYearTextBox = screen.getByLabelText("Graduation Year Input Box");
  const GradYearSubmit = screen.getByLabelText("Graduation Year Input Button");
  const PathwayDropdown0 = screen.getByLabelText(
    "Pathway Dropdown Menu Background 0"
  );
  const PathwayDropdown1 = screen.getByLabelText(
    "Pathway Dropdown Menu Background 1"
  );
  const SearchBox = screen.getByLabelText("Search Box");
  const OptionTable = screen.getByLabelText("Option Table");
  const ScheduleBackground = screen.getByLabelText("Schedule Background");
  const ResetButton = screen.getByLabelText("Reset Schedule Button");
  const ExportButton = screen.getByLabelText("Export Button");
  const GenerateButton = screen.getByLabelText("Generate Button");
  const InfoButton = screen.getByLabelText("Info Button");

  expect(GradYearTextBox).toBeInTheDocument();
  expect(GradYearSubmit).toBeInTheDocument();
  expect(PathwayDropdown0).toBeInTheDocument();
  expect(PathwayDropdown1).toBeInTheDocument();
  expect(SearchBox).toBeInTheDocument();
  expect(OptionTable).toBeInTheDocument();
  expect(ScheduleBackground).toBeInTheDocument();
  expect(ResetButton).toBeInTheDocument();
  expect(ExportButton).toBeInTheDocument();
  expect(GenerateButton).toBeInTheDocument();
  expect(InfoButton).toBeInTheDocument();
});

test("change class year", async () => {
  const GradYearTextBox = screen.getByLabelText("Graduation Year Input Box");
  const GradYearSubmit = screen.getByLabelText("Graduation Year Input Button");

  let user = userEvent.setup();
  await user.type(GradYearTextBox, "2025");
  await user.keyboard("[Enter]");

  const SemHeader1 = screen.getByLabelText("Semester Header 2025");
  expect(await SemHeader1).toBeInTheDocument();
  expect(await screen.findByText("Spring 2025")).toBeInTheDocument();

  await user.type(GradYearTextBox, "2029");
  await user.click(GradYearSubmit);
  const SemHeader2 = screen.getByLabelText("Semester Header 2027.5");
  expect(await SemHeader2).toBeInTheDocument();
  expect(await screen.findByText("Spring 2029")).toBeInTheDocument();
});

test("can search and select option table", async () => {
  const SearchBox = screen.getByLabelText("Search Box");
  const AvoidButton = screen.getByLabelText("Avoid Button");
  const TakeButton = screen.getByLabelText("Take Button");

  expect(SearchBox).toBeInTheDocument();
  expect(AvoidButton).toBeInTheDocument();

  let user = userEvent.setup();
  await user.type(SearchBox, "CSCI0150");

  const SearchOption1 = screen.getByLabelText("Search option 1");
  expect(SearchOption1).toBeInTheDocument();
  await user.click(SearchOption1);

  await user.click(AvoidButton);

  const AvoidDiv = await screen.findByText("CSCI0150");
  expect(await AvoidDiv).toBeInTheDocument();

  await user.type(SearchBox, "CSCI0170");
  const SearchOption2 = screen.getByLabelText("Search option 1");
  expect(SearchOption2).toBeInTheDocument();
  await user.click(SearchOption2);
  await user.click(TakeButton);

  const TakeDiv = await screen.findByText("CSCI0170");
  expect(await TakeDiv).toBeInTheDocument();
});

test("search, select, and delete from schedule", async () => {
  const SearchBox = screen.getByLabelText("Search Box");
  const ClasBox00 = screen.getByLabelText("Class Box 00");

  let user = userEvent.setup();
  await user.type(SearchBox, "CSCI0320");

  const SearchOption1 = screen.getByLabelText("Search option 1");
  expect(SearchOption1).toBeInTheDocument();
  await user.click(SearchOption1);

  await user.click(ClasBox00);

  const Course1 = await screen.findByText("CSCI0320");
  expect(await Course1).toBeInTheDocument();

  // await user.click(ClasBox00);

  // expect(screen.getByText("CSCI0320")).not.toBeVisible();
});

// test("don't allow wrong semester classes or classes that already exist", async () => {
//   const InputBox = screen.getByRole("textbox", { name: "Input Box" });
//   const Button = screen.getByRole("button", { name: "Input Button" });

//   let user = userEvent.setup();
//   await user.type(InputBox, "search");
//   await user.click(Button);

//   const SearchCall = screen.getByLabelText("search");
//   expect(await SearchCall).toBeInTheDocument();
//   expect(
//     await screen.findByText("Must load a file to search")
//   ).toBeInTheDocument();

//   await user.type(InputBox, "load_file small.csv");
//   await user.click(Button);
//   await user.type(InputBox, "search error");
//   await user.keyboard("[Enter]");
//   expect(await fileLoaded).toBe("small.csv");
//   await user.type(InputBox, "search 0 true hello 0");
//   await user.click(Button);
//   await user.type(InputBox, "search Student true COLUMN_INDEX 0");
//   await user.click(Button);
//   await user.type(InputBox, "search Student true COLUMN_HEADER Department");
//   await user.click(Button);

//   const ViewCalls = screen.getAllByLabelText("search");

//   expect(ViewCalls.length).toBe(5);
//   expect(await ViewCalls[1]).toBeInTheDocument();
//   expect(await ViewCalls[2]).toBeInTheDocument();
//   expect(await ViewCalls[3]).toBeInTheDocument();
//   expect(await ViewCalls[4]).toBeInTheDocument();
//   const ViewTable = screen.getByRole("table");
//   expect(ViewTable).toBeInTheDocument;

//   for (const r of small[3]) {
//     expect(await ViewTable).toContainElement(
//       (await screen.findAllByText(r))[0]
//     );
//   }
//   expect(
//     await screen.findByText(
//       "for coltype, input COLUMN_INDEX to search by column index, COLUMN_NAME to search by column name"
//     )
//   ).toBeInTheDocument();
//   expect(
//     await screen.findByText("query is not in the CSV")
//   ).toBeInTheDocument();
// });

// test("can replace class with class that's currently in search box", async () => {
//   const InputBox = screen.getByRole("textbox", { name: "Input Box" });
//   const Button = screen.getByRole("button", { name: "Input Button" });

//   let user = userEvent.setup();
//   await user.type(InputBox, "load_file small.csv");
//   await user.click(Button);

//   expect(await fileLoaded).toBe("small.csv");

//   const LoadCall = screen.getByLabelText("load_file");
//   expect(await LoadCall).toBeInTheDocument();
//   expect(await screen.findByText("File small.csv loaded")).toBeInTheDocument();

//   await user.type(InputBox, "view");
//   await user.click(Button);

//   const ViewCall = screen.getByLabelText("view");
//   expect(ViewCall).toBeInTheDocument;
//   for (const r of small) {
//     for (const e of r) {
//       expect(await ViewCall).toContainElement(
//         (await screen.findAllByText(e))[0]
//       );
//     }
//   }

//   await user.type(InputBox, "load_file numbered.csv");
//   await user.click(Button);
//   await user.type(InputBox, "view");
//   await user.click(Button);

//   expect(await fileLoaded).toBe("numbered.csv");

//   const ViewTables = screen.getAllByLabelText("view");
//   expect(ViewTables[1]).toBeInTheDocument;
//   for (const r of numbered) {
//     for (const e of r) {
//       expect(await ViewTables[1]).toContainElement(
//         (await screen.findAllByText(e))[0]
//       );
//     }
//   }
// });

// test("info button shows and removes information panels", async () => {
//   const InputBox = screen.getByRole("textbox", { name: "Input Box" });
//   const Button = screen.getByRole("button", { name: "Input Button" });

//   let user = userEvent.setup();
//   await user.type(InputBox, "load_file numbered.csv");
//   await user.click(Button);
//   await user.type(InputBox, "search blub false");
//   await user.click(Button);

//   expect(await fileLoaded).toBe("numbered.csv");

//   const SearchCall = screen.getByLabelText("search");
//   expect(SearchCall).toBeInTheDocument;
//   for (const r of numbered[0]) {
//     expect(await SearchCall).toContainElement(
//       (await screen.findAllByText(r))[0]
//     );
//   }

//   await user.type(InputBox, "load_file small.csv");
//   await user.click(Button);
//   await user.type(InputBox, "view");
//   await user.click(Button);

//   const ViewCall = screen.getByLabelText("view");
//   expect(ViewCall).toBeInTheDocument;
//   for (const r of small) {
//     for (const e of r) {
//       expect(await ViewCall).toContainElement(
//         (await screen.findAllByText(e))[0]
//       );
//     }
//   }
// });

// test("invalid graduation year", async () => {
//   const InputBox = screen.getByRole("textbox", { name: "Input Box" });
//   const Button = screen.getByRole("button", { name: "Input Button" });

//   let user = userEvent.setup();
//   await user.type(InputBox, "load_file numbered.csv");
//   await user.click(Button);
//   await user.type(InputBox, "search blub false");
//   await user.click(Button);

//   expect(await fileLoaded).toBe("numbered.csv");

//   const SearchCall = screen.getByLabelText("search");
//   expect(SearchCall).toBeInTheDocument;
//   for (const r of numbered[0]) {
//     expect(await SearchCall).toContainElement(
//       (await screen.findAllByText(r))[0]
//     );
//   }

//   await user.type(InputBox, "load_file small.csv");
//   await user.click(Button);
//   await user.type(InputBox, "search Professor true COLUMN_INDEX 0");
//   await user.click(Button);

//   expect(await fileLoaded).toBe("small.csv");

//   const SearchCalls = screen.getAllByLabelText("search");
//   expect(SearchCalls[1]).toBeInTheDocument;
//   for (const r of small[2]) {
//     expect(await SearchCalls[1]).toContainElement(
//       (await screen.findAllByText(r))[0]
//     );
//   }
// });
