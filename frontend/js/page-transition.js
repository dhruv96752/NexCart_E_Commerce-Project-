// ==========================================
// NEXCART NAVIGATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const navLinks =
        document.querySelectorAll(".nav-link");


    // ======================================
    // CURRENT PAGE
    // ======================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const params =
        new URLSearchParams(
            window.location.search
        );


    const currentCategory =
        params.get("category");


    // ======================================
    // ACTIVE TAB
    // ======================================

    navLinks.forEach(function (link) {

        const url =
            new URL(
                link.getAttribute("href"),
                window.location.href
            );


        const linkPage =
            url.pathname
                .split("/")
                .pop();


        const linkCategory =
            url.searchParams.get("category");


        let active = false;


        // HOME

        if (
            currentPage === "index.html" &&
            linkPage === "index.html"
        ) {

            active = true;

        }


        // SHOP

        else if (
            currentPage === "products.html" &&
            !currentCategory &&
            linkPage === "products.html" &&
            !linkCategory
        ) {

            active = true;

        }


        // CATEGORY

        else if (
            currentPage === "products.html" &&
            currentCategory &&
            linkCategory === currentCategory
        ) {

            active = true;

        }


        // PLANNER

        else if (
            currentPage === "planner.html" &&
            linkPage === "planner.html"
        ) {

            active = true;

        }


        // Add active class

        if (active) {

            link.classList.add("active");

        }

    });


    // ======================================
    // NAVIGATION
    // ======================================

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const target =
                    link.getAttribute("href");


                if (
                    !target ||
                    target === "#"
                ) {

                    return;

                }


                // Remove active from all

                navLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                // Make clicked tab active

                link.classList.add(
                    "active"
                );

            }
        );

    });

});