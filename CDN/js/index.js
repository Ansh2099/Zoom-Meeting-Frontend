window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  websdkready();
});

function websdkready() {
  const testTool = window.testTool;
  if (testTool.isMobileDevice()) {
    const vConsole = new VConsole();
  }
  // Backend configuration - you can switch between local and deployed backends
  const BACKEND_CONFIG = {
    local: "http://127.0.0.1:4000",
    deployed: "https://zoom-backend-0cpg.onrender.com"
  };
  
  // Default to deployed backend, but you can change this to 'local' for development
  const currentBackend = 'deployed';
  const authEndpoint = BACKEND_CONFIG[currentBackend];

  //https://developers.zoom.us/docs/meeting-sdk/auth/#signature
  async function getSignature(meetingNumber, role) {
    try {
      const response = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data.signature;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Hardcoded meeting details - you can modify these values
  const HARDCODED_MEETING_DETAILS = {
    meetingNumber: "8061256218",
    password: "Ansh", // Replace with actual password
    email: "anshpreetwork1009@gmail.com"
  };

  // Function to prompt user for display name
  function promptForDisplayName() {
    const defaultName = "Ansh"; // Default name if user cancels or enters empty
    const name = prompt("Enter your display name for the meeting:", defaultName);
    return name && name.trim() ? name.trim() : defaultName;
  }

  // Function to auto-fill form with hardcoded values
  function autoFillMeetingDetails() {
    const displayName = promptForDisplayName();
    document.getElementById("display_name").value = displayName;
    document.getElementById("meeting_number").value = HARDCODED_MEETING_DETAILS.meetingNumber;
    document.getElementById("meeting_pwd").value = HARDCODED_MEETING_DETAILS.password;
    document.getElementById("meeting_email").value = HARDCODED_MEETING_DETAILS.email;
    
    // Save to cookies for persistence
    testTool.setCookie("meeting_number", HARDCODED_MEETING_DETAILS.meetingNumber);
    testTool.setCookie("meeting_pwd", HARDCODED_MEETING_DETAILS.password);
    testTool.setCookie("display_name", displayName);
    testTool.setCookie("meeting_email", HARDCODED_MEETING_DETAILS.email);
  }

  // Note: Removed auto-fill on page load - form fields will appear empty
  // The autoFillMeetingDetails() function is still available for button clicks

  // some help code, remember mn, pwd, lang to cookie, and autofill.
  // Note: We're overriding the default values with our hardcoded ones
  if (testTool.getCookie("meeting_lang"))
    document.getElementById("meeting_lang").value =
      testTool.getCookie("meeting_lang");

  document
    .getElementById("meeting_lang")
    .addEventListener("change", function (e) {
      testTool.setCookie(
        "meeting_lang",
        document.getElementById("meeting_lang").value
      );
      testTool.setCookie(
        "_zm_lang",
        document.getElementById("meeting_lang").value
      );
    });

  // copy zoom invite link to mn, autofill mn and pwd.
  document
    .getElementById("meeting_number")
    .addEventListener("input", function (e) {
      let tmpMn = e.target.value.replace(/([^0-9])+/i, "");
      if (tmpMn.match(/([0-9]{9,11})/)) {
        tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
      }
      const tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
      if (tmpPwd) {
        document.getElementById("meeting_pwd").value = tmpPwd[1];
        testTool.setCookie("meeting_pwd", tmpPwd[1]);
      }
      document.getElementById("meeting_number").value = tmpMn;
      testTool.setCookie(
        "meeting_number",
        document.getElementById("meeting_number").value
      );
    });

  document.getElementById("clear_all").addEventListener("click", function (e) {
    testTool.deleteAllCookies();
    // Clear all form fields
    document.getElementById("display_name").value = "";
    document.getElementById("meeting_number").value = "";
    document.getElementById("meeting_pwd").value = "";
    document.getElementById("meeting_email").value = "";
    document.getElementById("meeting_lang").value = "en-US";
    document.getElementById("meeting_role").value = 0;
    window.location.href = "/index.html";
  });

  // NEW: Join Now button - Auto-fills and immediately joins the meeting
  document
    .getElementById("join_now")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      
      // Auto-fill with hardcoded values first
      autoFillMeetingDetails();
      
      const meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        showToast("Meeting number or username is empty", 3000);
        return false;
      }

      // Show loading message
      showToast("Joining meeting...", 2000);

      testTool.setCookie("meeting_number", meetingConfig.mn);
      testTool.setCookie("meeting_pwd", meetingConfig.pwd);

      try {
        const signature = await getSignature(
          meetingConfig.mn,
          meetingConfig.role
        );
        console.log(signature);
        meetingConfig.signature = signature;
        const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
        console.log(joinUrl);
        
        // Automatically open the meeting
        window.open(joinUrl, "_blank");
        showToast("Meeting opened in new tab!", 3000);

      } catch (error) {
        console.error("Failed to get signature", error);
        showToast("Failed to get signature. Please check your server.", 5000);
      }
    });

  // click join meeting button (original functionality)
  document
    .getElementById("join_meeting")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      const meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        showToast("Meeting number or username is empty", 3000);
        return false;
      }

      testTool.setCookie("meeting_number", meetingConfig.mn);
      testTool.setCookie("meeting_pwd", meetingConfig.pwd);

      try {
        const signature = await getSignature(
          meetingConfig.mn,
          meetingConfig.role
        );
        console.log(signature);
        meetingConfig.signature = signature;
        const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
        console.log(joinUrl);
        window.open(joinUrl, "_blank");

        // Now you can use meetingConfig.signature

        // Add your code to join the meeting here
      } catch (error) {
        console.error("Failed to get signature", error);
        showToast("Failed to get signature", 3000);
      }
    });

  function copyToClipboard(elementId) {
    const aux = document.createElement("input");
    aux.setAttribute(
      "value",
      document.getElementById(elementId).getAttribute("link")
    );
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  // NEW: Copy Join Link button with improved functionality
  document
    .getElementById("copy_join_link")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      
      // Auto-fill with hardcoded values first
      autoFillMeetingDetails();
      
      const meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        showToast("Meeting number or username is empty", 3000);
        return false;
      }

      try {
        const signature = await getSignature(meetingConfig.mn, meetingConfig.role);
        console.log(signature);
        meetingConfig.signature = signature;

        var joinUrl =
          testTool.getCurrentDomain() +
          "/meeting.html?" +
          testTool.serialize(meetingConfig);
        
        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(joinUrl);
          showToast("Join link copied to clipboard!", 3000);
        } else {
          // Fallback for older browsers
          document.getElementById("copy_link_value").setAttribute("link", joinUrl);
          copyToClipboard("copy_link_value");
          showToast("Join link copied to clipboard!", 3000);
        }
        
      } catch (error) {
        console.error("Failed to copy link", error);
        showToast("Failed to copy link. Please try again.", 3000);
      }
    });

  // click copy jon link button (original functionality - keeping for compatibility)
  window.copyJoinLink = async function (element) {
    const meetingConfig = testTool.getMeetingConfig();
    if (!meetingConfig.mn || !meetingConfig.name) {
      showToast("Meeting number or username is empty", 3000);
      return false;
    }

    const signature = await getSignature(meetingConfig.mn, meetingConfig.role);
    console.log(signature);
    meetingConfig.signature = signature;

    var joinUrl =
      testTool.getCurrentDomain() +
      "/meeting.html?" +
      testTool.serialize(meetingConfig);
    document.getElementById("copy_link_value").setAttribute("link", joinUrl);
    copyToClipboard("copy_link_value");
  };
}
