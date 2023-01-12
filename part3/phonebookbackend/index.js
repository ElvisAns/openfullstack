require("dotenv").config();
const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const morgan = require("morgan");
const db = require("./db.json");
const cors = require("cors");
const phoneBook = require("./models/phonebook");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
morgan.token("request-body", function (req, res) {
    return JSON.stringify(req.body);
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :request-body",
        {
            skip: function (req, res) {
                return req.method !== "POST";
            },
        }
    )
);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ message: "malformatted id" });
    }

    next(error);
};


app.get("/api/persons", (request, response) => {
    phoneBook.find({}).then((res) => {
        response.json(res);
    });
});

app.get("/info", (request, response) => {
    const date = new Date();
    phoneBook.count({}).then((count) => {
        response.send(
            `<h3>PhoneBook has info for ${count} people(s)</h3><br><h4>${date}</h4>`
        );
    });
});

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    const person = phoneBook
        .findById(id)
        .then((person) => {
            if (person) response.json(person);
            else {
                const notFound = { response: "The person id not found in phone book" };
                response.status(404).send(notFound).end();
            }
        })
        .catch((err) => next(err))
});

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = phoneBook
        .findByIdAndDelete(id)
        .then((person) => {
            if (person)
                response.send({ response: `success deleting the user with id ${id}` });
            else {
                const notFound = { response: "The person id not found in phone book" };
                response.status(404).send(notFound).end();
            }
        })
        .catch((err) => next(err))
});

app.post("/api/persons", (request, response) => {
    const name = request.body.name;
    const number = request.body.number;

    if (name === undefined || number === undefined) {
        response
            .status(400)
            .send({ response: "Your request isnt sending necessary datas" })
            .end();
        return;
    }

    if (name.length < 5) {
        response
            .status(400)
            .send({ response: "The name has to be 5characters long or more" })
            .end();
        return;
    }

    if (number.length < 10) {
        response
            .status(400)
            .send({ response: "The number has to be 10characters long or more" })
            .end();
        return;
    }

    phoneBook.find({ name: name }).then((res) => {
        if (res.length > 0) {
            response
                .status(400)
                .json({ response: "A similar name is already recorded" })
                .end();
        } else {
            const person = new phoneBook({
                name,
                number,
            });
            person
                .save()
                .then((res) => {
                    response.send({ response: `success add the user to the phonebook` });
                })
                .catch((err) => next(err))
        }
    });
});

app.patch("/api/persons/:id", (request, response) => {
    const name = request.body.name;
    const number = request.body.number;
    const id = request.params.id;

    const person = phoneBook
        .findById(id)
        .then((person) => {
            if (person) {
                //person is recorded

                if (number !== undefined) {
                    if (number.length < 10) {
                        response
                            .status(400)
                            .send({
                                response: "The number has to be 10characters long or more",
                            })
                            .end();
                        process.exit(1);
                    }
                    person.number = number;
                }

                if (name !== undefined) {
                    if (name.length < 5) {
                        response
                            .status(400)
                            .send({ response: "The name has to be 5characters long or more" })
                            .end();

                        process.exit(1);
                    }
                    person.name = name;
                }

                person
                    .save()
                    .then((res) => {
                        response.send({
                            response: `success updated the user with id ${id} to the phonebook`,
                        });
                    })
                    .catch((err) => next(err));
            } else {
                const notFound = { response: "The person id not found in phone book" };
                response.status(404).send(notFound).end();
                process.exit(1);
            }
        })
        .catch((err) => next(err));
});


// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
