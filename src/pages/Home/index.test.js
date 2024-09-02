import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-28T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
  focus: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-28T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Personel / Entreprise")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(await screen.findByText("En cours")).toBeInTheDocument();
      expect(await screen.findByText("Message envoyé !")).toBeInTheDocument();
    });
  });

});


describe("When a page is created", () => {

  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const section = await screen.findByTestId("events-testid");
    expect(section).toBeInTheDocument();
    const elements = await within(section).findAllByTestId("card-testid");
    expect(elements.length).toBe(2);
  });
  it("a list a people is displayed", async () => {
    render(<Home />);
    // section exists
    const section = await screen.findByTestId("people-testid");
    expect(section).toBeInTheDocument();
    // 6 cards in section
    const elements = within(section).getAllByTestId("people-card-testid");
    expect(elements.length).toBe(6);
    // Isabelle exists, antoine not
    expect(await within(section).findByText("Isabelle")).toBeInTheDocument();
    expect(within(section).queryByText("Antoine")).not.toBeInTheDocument();
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    const section = await screen.findByTestId("footer-testid");
    expect(within(section).getByText("Contactez-nous")).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const section = await screen.findByTestId("footer-testid");
    expect(section).toBeInTheDocument();
    expect(await within(section).findByText("Notre dernière prestation")).toBeInTheDocument();
    expect(await within(section).findByText("Forum #productCON"));
    expect(await within(section).findByTestId("card-testid")).toBeInTheDocument();
  })
});
