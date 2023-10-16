// const {calculateAccessibilityScore} = require("../services/ScansService");

// Rule Objects for testing
const rule1 = {
    id: 9,
    ruleId: "object-alt",
    userImpact: "Serious",
    wcag: "1.1.1",
    howToFixTheProblem: "Add alternative text to all embedded <object> elements using either inner text, title attributes, aria-label or aria-labelledby.",
    whyItMatters: "Screen readers have no way of translating non-text content into text announced to users. Instead, they read out alternative text. For screen reader users to obtain the information contained in embedded object elements which must contain short, descriptive alternative text.The object element defines an embedded object within a document. It is used to embed multimedia (audio, video, applets, etcetera.) or another web page into the document. The object element needs a text alternative so that users of screen readers know the contents of the object.When writing a text alternative, keep in mind that the purpose of the alternative text is to relay information to blind users about the image’s contents and purpose - blind users should be able to get as much information from alternative text as a sighted user gets from the image. Alternative text should give the intent, purpose, and meaning of the image.When writing alternative text, it’s helpful to keep the following questions in mind:Why is the non-text content here? What information is it presenting? What purpose does it fulfill? If I could not use the non-text content, what words would I use to convey the same information or function? Be sure that all text contained in this attribute is useful. Words like “chart”, “image”, “diagram”, or image file names tend not to be very useful.",
    ruleDescription: "All embedded objects must have text alternatives to be read out to screen reader users.",
    theAlgorithm: "Ensures that every object element has a text alternative.",
    disabilitiesAffected: "Blind,Deafblind",
    requirements: "Blind,Deafblind",
    wcagSuccessCriteria: "1.1.1 Non-text Content",
    section508Guidelines: "1194.22 (a) Text equivalent for non-text elements"
}
const rule2 = {
    id: 7,
    ruleId: "listitem",
    userImpact: "Serious",
    wcag: "1.3.1",
    howToFixTheProblem: "Ensure that all list item li elements are wrapped inside of ul or ol parent elements. List items may be contained in either unordered (bullet) lists or ordered (sequentially numbered) lists. Screen readers notify users when they come to a list, and tell them how many items are in a list. Announcing the number of list items and the current list item helps listeners know what they are listening to, and what to expect as they listen to it. Child list item elements must be contained within the appropriate parent list elements enabling screen readers to inform the listener that they are listening to a list.",
    whyItMatters: "For a list to be valid, it must have both parent and child elements. Parent elements can either be a set of ul tags or a set of ol tags. Child elements must be declared inside of these tags using the li tag. Screen readers notify users when they come to a list, and tell them how many items are in a list. Announcing the number of items in a list and the current list item helps listeners know what they are listening to, and what to expect as they listen to it. If you don't mark up a list using proper semantic markup in a hierarchy, list items cannot inform the listener that they are listening to a list when no parent is indicating the presence of a list and the type of list.",
    ruleDescription: "All list items (li) must be contained within ul or ol parent elements.",
    theAlgorithm: "Ensures li elements are used semantically.",
    disabilitiesAffected: "Blind,Deaf,Mobility",
    requirements: "WCAG 2.0 (A): MUST",
    wcagSuccessCriteria: "1.3.1 Info and Relationships",
    section508Guidelines: "Not specified, or not applicable"
}

let ruleToString = ({ruleId, userImpact, wcag, howToFixTheProblem, whyItMatters, ruleDescription, theAlgorithm, requirements, disabilitiesAffected, wcagSuccessCriteria, section508Guidelines}) =>
    `- Rule Id: ${ruleId}
    - User Impact: ${userImpact}
    - WCAG Rule: ${wcag}
    - How To Fix The Problem: ${howToFixTheProblem}
    - Why It Matters: ${whyItMatters}
    - Rule Description: ${ruleDescription}
    - The Algorithm: ${theAlgorithm}
    - Disabilities Affected: ${disabilitiesAffected}
    - Requirements: ${requirements}
    - WCAG Success Criteria: ${wcagSuccessCriteria}
    - Section 508 Guidelines: ${section508Guidelines}`;

let violationsArray = [rule1, rule2];
let list = document.getElementById("rules-list");

// Scan Object for testing
const scan = {
    _id: "6529f5835fe3677422faf8eb",
    timestamp: "2023-10-14T01:57:23.459Z",
    url: "https://0barriers.org/",
    inapplicable: [],
    passes: [],
    violations: violationsArray,
}

for (i = 0; i < violationsArray.length; ++i) {
    let listData = ruleToString(violationsArray[i])
    let li = document.createElement('li');
    li.innerText = listData;
    list.appendChild(li);
}

// let score = calculateAccessibilityScore(scan);

document.getElementById("url").innerHTML = scan.url;
document.getElementById("timestamp").innerHTML = scan.timestamp;
document.getElementById("complianceScore").innerHTML = score;

