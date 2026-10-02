// site.js
// Shared navigation + homepage listing carousel.

import {
    auth,
    db,
    collection,
    query,
    orderBy,
    onSnapshot,
    onAuthStateChanged
} from "./firebase.js";

const page = window.location.pathname.split("/").pop() || "index.html";
const protectedPages = ["products.html", "product.html", "profile.html", "user.html"];

function localDestination(path) { return `login.html?returnTo=${encodeURIComponent(path)}`; }
function goHome() { window.location.href = "index.html"; }
function goLogin() { if (auth.currentUser) { alert("You are already signed in as " + (auth.currentUser.email || "this account") + "."); return; } window.location.href = localDestination(page === "login.html" ? "index.html" : page + window.location.search); }
function goListings() { window.location.href = auth.currentUser ? "products.html" : localDestination("products.html"); }
function goProfile() { window.location.href = auth.currentUser ? "profile.html" : localDestination("profile.html"); }
function contactPlywood() { window.location.href = "mailto:stonedriggersofficial@gmail.com?subject=Plywood%20Contact"; }
async function logoutPlywood() { try { const { signOut } = await import("./firebase.js"); await signOut(auth); window.location.href = "index.html"; } catch (error) { alert("Could not log out.\n\n" + error.message); } }
function buildNavigation() {
 let nav=document.querySelector(".top-nav"); if(!nav){nav=document.createElement("nav");nav.className="nav-buttons top-nav";document.body.prepend(nav);}
 nav.innerHTML=`<div class="nav-spacer"></div><div class="nav-actions"><button type="button" class="nav-btn" id="nav-login">Login</button><button type="button" class="nav-btn" id="nav-listings">Listings</button><button type="button" class="nav-btn" id="nav-profile">Profile</button><button type="button" class="nav-btn" id="nav-contact">Contact</button><button type="button" class="nav-btn" id="nav-home">Home</button><button type="button" class="nav-btn logout-btn" id="nav-logout">Logout</button></div>`;
 document.getElementById("nav-login")?.addEventListener("click",goLogin); document.getElementById("nav-listings")?.addEventListener("click",goListings); document.getElementById("nav-profile")?.addEventListener("click",goProfile); document.getElementById("nav-contact")?.addEventListener("click",contactPlywood); document.getElementById("nav-home")?.addEventListener("click",goHome); document.getElementById("nav-logout")?.addEventListener("click",logoutPlywood);
}
function protectPage(user) { if(!protectedPages.includes(page)||user)return; window.location.replace(localDestination(page+window.location.search)); }

function createHomeListingCard(docSnapshot) {
    const item = docSnapshot.data();

    const card = document.createElement("article");
    card.className = "home-listing-card";
    card.tabIndex = 0;

    card.innerHTML = `
        ${
            item.imageUrl
                ? `<img src="${item.imageUrl}" alt="${item.title || "Listing image"}">`
                : `<div class="listing-placeholder">PLYWOOD</div>`
        }

        <div class="home-listing-card-content">
            <div class="listing-card-topline">
                <span class="listing-label">LOCAL FIND</span>
                <span class="listing-price">$${item.price ?? 0}</span>
            </div>

            <h3>${item.title || "Untitled Listing"}</h3>
            <p>${item.desc || "No description provided."}</p>

            <small>
                ${item.location ? item.location + " • " : ""}
                ${item.seller || "Unknown seller"}
            </small>
        </div>
    `;

    const openListingThroughLogin = () => {
        const destination =
            `product.html?id=${encodeURIComponent(docSnapshot.id)}`;

        window.location.href =
            `login.html?returnTo=${encodeURIComponent(destination)}`;
    };

    card.addEventListener("click", openListingThroughLogin);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openListingThroughLogin();
        }
    });

    return card;
}

function setupHomeCarousel() {
    const track = document.getElementById("home-listings-track");
    if (!track) return;

    const q = query(
        collection(db, "listings"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(
        q,
        (snapshot) => {
            track.innerHTML = "";

            if (snapshot.empty) {
                track.innerHTML = `
                    <div class="carousel-empty">
                        <h3>No listings yet.</h3>
                        <p>Sign in and create the first Plywood listing.</p>
                    </div>
                `;
                return;
            }

            snapshot.forEach((docSnapshot) => {
                track.appendChild(createHomeListingCard(docSnapshot));
            });
        },
        (error) => {
            console.error("Homepage listing error:", error);
            track.innerHTML = `
                <div class="carousel-empty">
                    <h3>Listings are temporarily unavailable.</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    );
}

buildNavigation();

onAuthStateChanged(auth, (user) => { protectPage(user); const logout=document.getElementById("nav-logout"); if(logout) logout.style.display=user?"inline-flex":"none"; const login=document.getElementById("nav-login"); if(login&&user) login.textContent="Account"; });

setupHomeCarousel();
